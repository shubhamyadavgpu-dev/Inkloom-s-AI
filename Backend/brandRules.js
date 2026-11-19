
const express = require("express");
const db = require("./db");

const router = express.Router();

// Get active brand rules
router.get("/", async (req, res, next) => {
    try {
        const [rules] = await db.query(`
            SELECT id, name, description, active, created_at
            FROM brand_rules
            WHERE active = 1
            ORDER BY created_at DESC
        `);

        res.json({
            success: true,
            rules
        });

    } catch (err) {
        next(err);
    }
});

// Add brand rule
router.post("/", async (req, res, next) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "name and description are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO brand_rules (name, description)
             VALUES (?, ?)`,
            [name.trim(), description.trim()]
        );

        const [rows] = await db.query(
            "SELECT * FROM brand_rules WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Brand rule added",
            rule: rows[0]
        });

    } catch (err) {
        next(err);
    }
});

// Update brand rule
router.patch("/:id", async (req, res, next) => {
    try {
        const { name, description, active } = req.body;

        const [result] = await db.query(
            `UPDATE brand_rules
             SET name = COALESCE(?, name),
                 description = COALESCE(?, description),
                 active = COALESCE(?, active)
             WHERE id = ?`,
            [
                name ?? null,
                description ?? null,
                active ?? null,
                req.params.id
            ]
        );

        if (!result.affectedRows) {
            return res.status(404).json({
                success: false,
                message: "Brand rule not found"
            });
        }

        res.json({
            success: true,
            message: "Brand rule updated"
        });

    } catch (err) {
        next(err);
    }
});

// Delete brand rule
router.delete("/:id", async (req, res, next) => {
    try {
        const [result] = await db.query(
            "DELETE FROM brand_rules WHERE id = ?",
            [req.params.id]
        );

        if (!result.affectedRows) {
            return res.status(404).json({
                success: false,
                message: "Brand rule not found"
            });
        }

        res.json({
            success: true,
            message: "Brand rule deleted"
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
