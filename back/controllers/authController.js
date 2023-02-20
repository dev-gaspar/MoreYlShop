const User = require("../models/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Registrar un nuevo usuario /api/usuario/
exports.setUsuario = catchAsyncErrors(async (req, res, next) => {
  const { nombre, email, password } = req.body;
  var result;

  if (!req.body.avatar) {
    result = {
      public_id: "avatars/avatar_hqtp3y",
      secure_url:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    };
  } else {
    result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: "240",
      crop: "scale",
    });
  }

  const respuesta = await User.create({
    nombre,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
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
  const contrasenaOK = await user.compararPass(password);

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

//Olvide mi contraseña, recuperar contraseña
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Usuario no se encuentra registrado", 404));
  }
  const resetToken = user.genResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Crear una url para hacer el reset de la contraseña
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;

  const mensaje = `<html>
  <head>
    <title>Restablecer contraseña</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      /* FONTS */
      @media screen {
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          src: local("Lato Regular"), local("Lato-Regular"),
            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
              format("woff");
        }

        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 700;
          src: local("Lato Bold"), local("Lato-Bold"),
            url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
              format("woff");
        }

        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 400;
          src: local("Lato Italic"), local("Lato-Italic"),
            url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
              format("woff");
        }

        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 700;
          src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
            url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
              format("woff");
        }
      }

      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* ANDROID CENTER FIX */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    </style>
  </head>
  <body
    style="
      background-color: #f4f4f4;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <!-- HIDDEN PREHEADER TEXT -->
    <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        font-family: 'Lato', Helvetica, Arial, sans-serif;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
    Parece que intentaste iniciar sesión demasiadas veces. Veamos si podemos recuperar su cuenta.
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td bgcolor="#7c72dc" align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="480">
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 40px 10px"
              >
                <a href="http://litmus.com" target="_blank">
                  <img
                    alt="More Yl Shop"
                    src="https://res.cloudinary.com/moreylshop/image/upload/v1676389191/home_wrzkwn.jpg"
                    width="480"
                    style="
                      display: block;
                      font-family: 'Lato', Helvetica, Arial, sans-serif;
                      color: #ffffff;
                      font-size: 20px;
                      border-radius: 5px;
                    "
                    border="0"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- HERO -->
      <tr>
        <td bgcolor="#7c72dc" align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="480">
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: #111111;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 4px;
                  line-height: 48px;
                "
              >
                <h1 style="font-size: 32px; font-weight: 400; margin: 0">
                  ¿Problemas para entrar?
                </h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- COPY BLOCK -->
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="480">
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 40px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  Restablecer su contraseña es fácil. Simplemente presione el
                  botón de abajo y sigue las instrucciones.
                </p>
              </td>
            </tr>
            <!-- BULLETPROOF BUTTON -->
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      style="padding: 20px 30px 60px 30px"
                    >
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            align="center"
                            style="border-radius: 3px"
                            bgcolor="#7c72dc"
                          >
                            <a
                              href="${resetUrl}"
                              target="_blank"
                              style="
                                font-size: 20px;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #ffffff;
                                text-decoration: none;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 15px 25px;
                                border-radius: 2px;
                                border: 1px solid #7c72dc;
                                display: inline-block;
                              "
                              >Restablecer contraseña</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- COPY CALLOUT -->

      <!-- SUPPORT CALLOUT -->
      <tr>
        <td
          bgcolor="#f4f4f4"
          align="center"
          style="padding: 30px 10px 0px 10px"
        >
          <table border="0" cellpadding="0" cellspacing="0" width="480">
            <!-- HEADLINE -->
            <tr>
              <td
                bgcolor="#C6C2ED"
                align="center"
                style="
                  padding: 30px 30px 30px 30px;
                  border-radius: 4px 4px 4px 4px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <h2
                  style="
                    font-size: 20px;
                    font-weight: 400;
                    color: #111111;
                    margin: 0;
                  "
                >
                  Necesitas más ayuda?
                </h2>
                <p style="margin: 0">
                  <a
                    href="https://wa.me/573153413746"
                    target="_blank"
                    style="color: #7c72dc"
                    >Nosotros estamos aqui listos para hablar</a
                  >
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- FOOTER -->
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="480">
            <!-- PERMISSION REMINDER -->
            <tr>
              <td
                bgcolor="#f4f4f4"
                align="left"
                style="
                  padding: 0px 30px 30px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 18px;
                "
              >
                <p style="margin: 0">
                  Recibiste este correo electrónico porque solicitaste un
                  restablecimiento de contraseña. Si no lo hiciste,
                  <a
                    href="https://wa.me/573153413746"
                    target="_blank"
                    style="color: #111111; font-weight: 700"
                    >por favor contáctenos.</a
                  >.
                </p>
              </td>
            </tr>

            <!-- ADDRESS -->
            <tr>
              <td
                bgcolor="#f4f4f4"
                align="left"
                style="
                  padding: 0px 30px 30px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 18px;
                "
              >
                <p style="margin: 0">Cerete, Cordoba, Colombia</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  try {
    await sendEmail({
      email: user.email,
      subject: "MoreYlShop - Recupera tu contraseña",
      mensaje,
    });
    res.status(200).json({
      success: true,
      message: `Correo enviado a: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Hash el token que llego con la URl
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //Buscamos al usuario al que le vamos a resetear la contraseña
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  //El usuario si esta en la base de datos?
  if (!user) {
    return next(new ErrorHandler("El token es invalido o ya expiró", 400));
  }
  //Diligenciamos bien los campos?
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Contraseñas no coinciden", 400));
  }

  //Setear la nueva contraseña
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  tokenEnviado(user, 200, res);
});

//Ver perfil de usuario (Usuario que esta logueado)
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await User.findById(req.respuesta.id);

  res.status(200).json({
    success: true,
    respuesta,
  });
});

//Update Contraseña (usuario logueado)
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.respuesta.id).select("+password");

  //Revisamos si la contraseña vieja es igual a la nueva
  const sonIguales = await user.compararPass(req.body.oldPassword);

  if (!sonIguales) {
    return next(new ErrorHandler("La contraseña actual no es correcta", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  tokenEnviado(user, 200, res);
});

//Update perfil de usuario (logueado)
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  //Actualizar el email por user a decisiòn de cada uno
  const newUserData = {
    nombre: req.body.nombre,
    email: req.body.email,
  };

  //updata Avatar:
  if (req.body.avatar !== "") {
    const user = await User.findById(req.respuesta.id);
    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 240,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.respuesta.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//Servicios controladores sobre usuarios por parte de los ADMIN

//Ver todos los usuarios
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Ver el detalle de 1 usuario
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(
        `No se ha encontrado ningun usuario con el id: ${req.params.id}`
      )
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Actualizar perfil de usuario (como administrador)
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const nuevaData = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, nuevaData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//Eliminar usuario (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`Usuario con id: ${req.params.id} 
      no se encuentra en nuestra base de datos`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Usuario eliminado correctamente",
  });
});
