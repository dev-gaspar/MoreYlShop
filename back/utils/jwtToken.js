//Crear y enviar un token guardado en una cookie
const tokenEnviado = (user, StatusCode, res) => {
  //Creamos en token
  const token = user.getJwtToken();

  //Opciones del token
  const Opciones = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRATION_TIME_NAV * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(StatusCode).cookie("token", token, Opciones).json({
    success: true,
    token: token,
    respuesta: user,
  });
};

module.exports = tokenEnviado;
