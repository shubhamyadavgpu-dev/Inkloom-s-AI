
function notFound(req, res, next) {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
}

function errorHandler(err, req, res, next) {
    console.error(err);

    const status = err.statusCode || 500;

    res.status(status).json({
        success: false,
        message: status === 500
            ? "Internal server error"
            : err.message,

        ...(process.env.NODE_ENV === "development"
            ? { detail: err.message }
            : {})
    });
}

module.exports = {
    notFound,
    errorHandler
};
