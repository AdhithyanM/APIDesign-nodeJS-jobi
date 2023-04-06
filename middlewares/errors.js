module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  const environment = process.env.NODE_ENVIRONMENT;

  if (environment === "development") {
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (environment === "production") {
    let error = { ...err };

    error.message = err.message;

    return res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
