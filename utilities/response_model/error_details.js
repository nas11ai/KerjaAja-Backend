class ErrorDetails extends Error {
  constructor(name, attribute, message) {
    super(message);
    this.name = name;
    this.attribute = attribute;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorDetails;
