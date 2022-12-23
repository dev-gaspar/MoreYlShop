const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const usuarioScheme = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Por favor ingrese el nombre"],
    maxlength: [120, "Por favor no puede exceder los 120 caracteres"],
  },

  email: {
    type: String,
    required: [true, "Por favor ingrese el correo electronico"],
    unique: true,
    validate: [validator.isEmail, "Por favor ingrese un email valido"],
  },

  password: {
    type: String,
    required: [true, "Por favor ingrese una contraseña"],
    minlength: [8, "Tu contraceña no puede tener menos de 8 caracteres"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  fechaRegistro: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encriptamos contraseña antes de guardarla
usuarioScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Desencriptamos contrasena y comparamos
usuarioScheme.methods.compararPass = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

//Retornar un jwt token
usuarioScheme.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
};

//Generaramos un token para reset de contraceña
usuarioScheme.methods.genResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashear y setear resetToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Setear fecha de expiracion del token
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; //el token dura solo 30 minutos

  return resetToken;
};

module.exports = mongoose.model("auth", usuarioScheme);
