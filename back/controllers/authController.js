const User = require("../models/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");

//Registrar un nuevo usuario /api/usuario/
exports.setUsuario = catchAsyncErrors(async (req, res, next) => {
  const { nombre, email, password } = req.body;

  const respuesta = await User.create({
    nombre,
    email,
    password,
    avatar: {
      public_id: "avatardefault_92824",
      url: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
  });

  tokenEnviado(respuesta, 201, res);
});

//Inicio de sesion
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //revisamos si los campos estan completos
  if (!email || !password) {
    return next(new ErrorHandler("Por favor ingrese email y contraseña", 404));
  }

  //buscar en usuario en la base de datos
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email o contraseña invalidos", 401));
  }

  //verificamos la contraseña asociada al correo
  const contrasenaOK = await user.comparePass(password);

  if (!contrasenaOK) {
    return next(new ErrorHandler("Contraseña invalida", 401));
  }

  tokenEnviado(user, 200, res);
});

//Ver lista de usuarios /api/usuarios
exports.getUsuarios = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await User.find();

  if (!respuesta) {
    return next(new ErrorHandler("Error el obtener los usuarios", 404));
  }

  res.status(200).json({
    success: true,
    cantidad: respuesta.length,
    respuesta,
  });
});

//Obtiene un usuario /api/usuario/:id
exports.getUsuario = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await User.findById(req.params.id);

  if (!respuesta) {
    return next(new ErrorHandler("Usuario no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    respuesta,
  });
});

//Elimina un usuario /api/usuario/:id
exports.deleteUsuario = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await User.findById(req.params.id);
  if (!respuesta) {
    return next(new ErrorHandler("Este usuario no existe", 404));
  }

  await respuesta.remove();

  res.status(200).json({
    success: true,
    message: "Usuario eliminado",
  });
});
