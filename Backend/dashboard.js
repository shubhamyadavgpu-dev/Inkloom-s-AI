
const express = require("express");
const db = require("./db");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const [[totals]] = await db.query(`
            SELECT
                COUNT(*) AS totalSubmissions,
                SUM(status IN ('pending','review')) AS pendingSubmissions,
                SUM(status = 'approved') AS approvedSubmissions,
                SUM(status = 'revision') AS revisionSubmissions
            FROM submissions
        `);

        const [recent] = await db.query(`
            SELECT id, title, category, owner, status, created_at
            FROM submissions
            ORDER BY created_at DESC
            LIMIT 6
        `);

        const [rules] = await db.query(`
            SELECT COUNT(*) AS totalRules
            FROM brand_rules
            WHERE active = 1
        `);

        res.json({
            success: true,

            stats: {
                total: Number(totals.totalSubmissions || 0),
                pending: Number(totals.pendingSubmissions || 0),
                approved: Number(totals.approvedSubmissions || 0),
                revision: Number(totals.revisionSubmissions || 0),
                totalRules: Number(rules[0].totalRules || 0)
            },

            recent
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
