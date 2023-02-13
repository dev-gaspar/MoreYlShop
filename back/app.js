const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const fs = require("fs");

//configurar archivo file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "back/config/config.env" });

//Uso de constates importadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Improtar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");
const orders = require("./routes/orders");

//(ruta del navegador)
app.use("/api", productos);
app.use("/api", usuarios);
app.use("/api", orders);

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "../front/build", "index.html");

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "More Yl - Incio");
    data = data.replace(/\$OG_DESCRIPTION/g, "Tienda virtual More YL Shop");
    result = data.replace(/\$OG_IMAGE/g, "https://i.imgur.com/V7irMl8.png");
    res.send(result);
  });
});

app.get("/catalogo", function (req, res) {
  const filePath = path.resolve(__dirname, "../front/build", "index.html");

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "More Yl - Catalogo");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Catalogo tienda virtual More YL Shop"
    );
    result = data.replace(/\$OG_IMAGE/g, "https://i.imgur.com/V7irMl8.png");
    res.send(result);
  });
});

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../front/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../front/build/index.html"))
  );
}

//MiddleWares para manejar errores
app.use(errorMiddleware);

module.exports = app;
