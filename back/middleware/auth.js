const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Verificamo si estamos autenticados, (existencia y veracidad del token)

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  //verificamos si el user tiene una cookie
  if (!token) {
    next(
      new ErrorHandler("Debe iniciar sesion para acceder a este recurso", 401)
    );
  }

  //decodificamos el token
  const decodificada = jwt.decode(token, process.env.JWT_SECRET);
  //el token generado parte de un id, extraemos el user con ese id decodificado
  req.respuesta = await User.findById(decodificada.id);

  next();
});

//Capturar role
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.respuesta.role)) {
      return next(
        new ErrorHandler(`Role ${req.respuesta.role} no esta autorizado`, 401)
      );
    }
    next();
  };
};
