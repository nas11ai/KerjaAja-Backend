const { ErrorResponse } = require("../utilities/response_model");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    res.status(err.code).json(err);
    return
  }
  // TODO: ganti console ke log kalau sudah mau production
  console.error(err);
  res.status(500).json({
    name: err.name,
    message: "Internal Server Error"
  });
}

module.exports = errorHandler;
