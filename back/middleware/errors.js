const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.stack,
  });

  //Error de clave duplicada en mongoose
  if (err.code === 1100) {
    const message = `Clave duplicada ${Object.keys(err.keyValue)}`;
    error = new ErrorHandler(message, 400);
  }

  //Error en JWT
  if (err.name === "JsonWebTokenError") {
    const message = "Token de Json Web es invalido, intentelo de nuevo";
    error = new ErrorHandler(message, 400);
  }

  //Error cuando el token este expirado
  if (err.name === "TokenExpiredError") {
    const message = "El token de JWT esta vencido. Ya expiró.";
    error = new ErrorHandler(message, 400);
  }
};
