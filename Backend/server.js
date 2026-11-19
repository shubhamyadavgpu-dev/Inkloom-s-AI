
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const dashboardRoutes = require("./dashboard");
const submissionRoutes = require("./submissions");
const brandRuleRoutes = require("./brandRules");
const analysisRoutes = require("./analysis");

const { notFound, errorHandler } = require("./errorHandler");

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors({
    origin: process.env.CLIENT_ORIGIN
        ? process.env.CLIENT_ORIGIN.split(",").map(x => x.trim())
        : true
}));

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Check API and database connection
app.get("/api/health", async (req, res, next) => {
    try {
        await db.query("SELECT 1");

        res.json({
            success: true,
            message: "Inkloom API and MySQL are connected"
        });
    } catch (err) {
        next(err);
    }
});

// API routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/brand-rules", brandRuleRoutes);
app.use("/api/analyze", analysisRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Inkloom backend running at http://localhost:${PORT}`);
});
