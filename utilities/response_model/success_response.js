const { API_VERSION } = require("../../utilities/config");

class SuccessResponse {
  constructor(code, status, data) {
    this.code = code;
    this.status = status;
    this.data = data;
    this.meta = {
      version: API_VERSION,
      timestamp: new Date().toLocaleString(),
    };
  }
}

module.exports = SuccessResponse;
