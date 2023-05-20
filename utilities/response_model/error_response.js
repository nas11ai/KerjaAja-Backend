const { API_VERSION } = require("../../utilities/config");

class ErrorResponse {
  constructor(code, status, errors) {
    this.code = code;
    this.status = status;
    this.errors = errors;
    this.meta = {
      version: API_VERSION,
      timestamp: new Date().toLocaleString(),
    };
  }
}

module.exports = ErrorResponse;
