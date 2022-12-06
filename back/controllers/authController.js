const User = require("../models/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

//cerrar sesion
exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Sesion cerrada",
  });
});

//Olvide mi contraceña, recuperar
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Usuario no registrado", 404));
  }

  const resetToken = user.genResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Creamos una url para hacer el reset de la contraseña
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/resetPassword/${resetToken}`;

  const mensaje = `Hola!\n\nAccede a este link para cambiar tu contraseña: \n \n ${resetUrl} \n \n Si no lo solicistaste por favor comunicate con soporte\n\n Att: More YL Shop`;

  try {
    await sendEmail({
      email: user.email,
      subject: "More YL Shop - Recuperacion de contraseña",
      mensaje,
    });

    res.status(200).json({
      success: true,
      message: `Correo enviado a: ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Hash el token que llega con la URL
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //Buscamos al usuario al que le vamos a resetear la contraseña
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("El token es invalido o ya expiro", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Las contraseñas no coinciden", 400));
  }

  //Seteamos la nueva contraseña
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });
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
