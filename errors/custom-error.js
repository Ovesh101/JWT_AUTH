class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500; // Default status code is 500 if not provided
  }
}

export default CustomAPIError;
