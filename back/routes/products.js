const express = require("express");
const router = express.Router();

const {
  getProductos,
  setProducto,
  getProducto,
  deleteProducto,
  updateProducto,
} = require("../controllers/productsController"); //Tremos la respuesta json del controlador

router.route("/productos").get(getProductos); //Establecemos desde que ruta queremos ver getProducts

router.route("/productos").post(setProducto); //Establecemos la ruta para crear un producto

router.route("/productos/:id").get(getProducto); //Establecemos la ruta para obtener un producto por id

router.route("/productos/:id").delete(deleteProducto); //Establecemos la ruta para eliminar un producto por id

router.route("/productos/:id").put(updateProducto); //Establecemos la ruta para eliminar un producto por id




module.exports = router;
