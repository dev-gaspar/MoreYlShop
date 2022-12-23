const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//Uso de constates importadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Improtar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");

//(ruta del navegador)
app.use("/api", productos);
app.use("/api", usuarios);

//MiddleWares para manejar errores
app.use(errorMiddleware);

module.exports = app;
