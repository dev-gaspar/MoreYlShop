const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

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

  const url = `${req.protocol}://${req.get("host")}/`;

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "More Yl | Incio");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Moda sostenible - contraentrega - transparente - sin comprometer la calidad."
    );
    data = data.replace(/\$OG_URL/g, url);
    data = data.replace(/\$OG_TYPE/g, "website");
    result = data.replace(
      /\$OG_IMAGE/g,
      "https://res.cloudinary.com/moreylshop/image/upload/v1676322293/home_buaufu.jpg"
    );
    res.send(result);
  });
});

app.get("/catalogo", function (req, res) {
  const filePath = path.resolve(__dirname, "../front/build", "index.html");

  const url = `${req.protocol}://${req.get("host")}/catalogo`;
  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "More Yl | Catalogo");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Catalogo tienda virtual More YL Shop"
    );
    data = data.replace(/\$OG_URL/g, url);
    data = data.replace(/\$OG_TYPE/g, "product.group");
    result = data.replace(
      /\$OG_IMAGE/g,
      "https://res.cloudinary.com/moreylshop/image/upload/v1676323131/Catalogo_cig6gq.jpg"
    );
    res.send(result);
  });
});

app.get("/producto/:id", async function (req, res) {
  const filePath = path.resolve(__dirname, "../front/build", "index.html");
  const url = `${req.protocol}://${req.get("host")}/producto/${req.params.id}`;

  const meta = await productoById(req.params.id, req);
  const nombre = meta.nombre;
  const descripcion = meta.descripcion.substr(0, 250);
  const imagen = meta.imagen[0].url;

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/\$OG_TITLE/g, "More Yl | " + nombre);
    data = data.replace(/\$OG_DESCRIPTION/g, descripcion);
    data = data.replace(/\$OG_URL/g, url);
    data = data.replace(/\$OG_TYPE/g, "product");
    result = data.replace(/\$OG_IMAGE/g, imagen);
    res.send(result);
  });
});

async function productoById(id, req) {
  const url = `${req.protocol}://${req.get("host")}/api/productos/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.respuesta;
}

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../front/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../front/build/index.html"))
  );
}

//MiddleWares para manejar errores
app.use(errorMiddleware);

module.exports = app;
