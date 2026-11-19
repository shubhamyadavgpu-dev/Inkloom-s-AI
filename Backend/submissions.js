
const express = require("express");
const db = require("./db");

const router = express.Router();

const allowedStatuses = [
    "pending",
    "review",
    "approved",
    "revision"
];

// Get all submissions
router.get("/", async (req, res, next) => {
    try {
        const { status, search } = req.query;

        const conditions = [];
        const values = [];

        if (status && status !== "all") {
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status filter"
                });
            }

            conditions.push("status = ?");
            values.push(status);
        }

        if (search) {
            conditions.push(
                "(title LIKE ? OR owner LIKE ? OR category LIKE ?)"
            );

            values.push(
                `%${search}%`,
                `%${search}%`,
                `%${search}%`
            );
        }

        const sql = `
            SELECT
                id, title, category, owner, status,
                created_at, updated_at
            FROM submissions
            ${conditions.length
                ? "WHERE " + conditions.join(" AND ")
                : ""}
            ORDER BY updated_at DESC
        `;

        const [rows] = await db.query(sql, values);

        res.json({
            success: true,
            submissions: rows
        });

    } catch (err) {
        next(err);
    }
});

// Get one submission
router.get("/:id", async (req, res, next) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM submissions WHERE id = ?",
            [req.params.id]
        );

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        res.json({
            success: true,
            submission: rows[0]
        });

    } catch (err) {
        next(err);
    }
});

// Create submission
router.post("/", async (req, res, next) => {
    try {
        const {
            title,
            category,
            owner,
            content = ""
        } = req.body;

        if (!title || !category || !owner) {
            return res.status(400).json({
                success: false,
                message: "title, category and owner are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO submissions
            (title, category, owner, content, status)
            VALUES (?, ?, ?, ?, 'pending')`,
            [
                title.trim(),
                category,
                owner.trim(),
                content
            ]
        );

        const [rows] = await db.query(
            "SELECT * FROM submissions WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Submission created",
            submission: rows[0]
        });

    } catch (err) {
        next(err);
    }
});

// Update submission status
router.patch("/:id/status", async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const [result] = await db.query(
            "UPDATE submissions SET status = ? WHERE id = ?",
            [status, req.params.id]
        );

        if (!result.affectedRows) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        res.json({
            success: true,
            message: "Submission status updated"
        });

    } catch (err) {
        next(err);
    }
});

// Delete submission
router.delete("/:id", async (req, res, next) => {
    try {
        const [result] = await db.query(
            "DELETE FROM submissions WHERE id = ?",
            [req.params.id]
        );

        if (!result.affectedRows) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        res.json({
            success: true,
            message: "Submission deleted"
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
