const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for the developer
  console.log(err);

  // Mongoose bad ObjectID - Invalid parameter
  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Duplicate error handler
  if (err.code === 11000) {
    const message = "Duplicate field value not allowed";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
