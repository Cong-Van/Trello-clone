class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.name = "ApiError";

    this.statusCode = statusCode;

    // Ghi lại Stack Trace để có thể tiện debug
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
