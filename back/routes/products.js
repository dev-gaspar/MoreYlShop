const express = require("express");
const router = express.Router();

const { getProducts } = require("../controllers/productsController"); //Tremos la respuesta json del controlador

router.route("/productos").get(getProducts); //Establecemos desde que ruta queremos ver getProducts

module.exports = router;
