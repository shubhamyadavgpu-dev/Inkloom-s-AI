
const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const {
            title = "Untitled content",
            content,
            contentType = "Text",
            submissionId = null
        } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "content is required"
            });
        }

        // Fetch active brand rules
        const [rules] = await db.query(`
            SELECT id, name, description
            FROM brand_rules
            WHERE active = 1
            ORDER BY id
        `);

        const findings = [];

        // Check content against each rule
        for (const rule of rules) {
            const phrases = [
                ...rule.description.matchAll(/["“']([^"”']{2,})["”']/g)
            ].map(match => match[1]);

            const avoidMatch = rule.description.match(
                /avoid\s*:\s*([^.;\n]+)/i
            );

            if (avoidMatch) {
                phrases.push(avoidMatch[1].trim());
            }

            for (const phrase of [...new Set(phrases)]) {
                if (content.toLowerCase().includes(phrase.toLowerCase())) {
                    const severity =
                        /absolute|guarantee|legal|claim/i.test(
                            rule.name + " " + rule.description
                        )
                            ? "high"
                            : "medium";

                    findings.push({
                        ruleId: rule.id,
                        ruleName: rule.name,
                        severity,
                        excerpt: phrase,
                        explanation: rule.description,
                        suggestion:
                            `Review or replace "${phrase}" according to the brand rule.`
                    });
                }
            }
        }

        // Calculate score
        const score = Math.max(
            0,
            100 - findings.reduce(
                (sum, item) =>
                    sum + (item.severity === "high" ? 18 : 10),
                0
            )
        );

        const analysis = {
            title,
            contentType,
            score,
            findingCount: findings.length,
            verdict: findings.length
                ? "Needs attention"
                : "Looks on-brand",
            findings,
            note:
                "Rule-based checks against active workspace rules. This is not an AI model or a substitute for human review."
        };

        // Save analysis when a valid submission ID is supplied
        if (submissionId) {
            const [existing] = await db.query(
                "SELECT id FROM submissions WHERE id = ?",
                [submissionId]
            );

            if (existing.length) {
                await db.query(
                    "UPDATE submissions SET content = ? WHERE id = ?",
                    [content, submissionId]
                );

                await db.query(
                    `INSERT INTO analyses
                    (submission_id, score, finding_count, result_json)
                    VALUES (?, ?, ?, ?)`,
                    [
                        submissionId,
                        score,
                        findings.length,
                        JSON.stringify(analysis)
                    ]
                );
            }
        }

        res.json({
            success: true,
            analysis
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
