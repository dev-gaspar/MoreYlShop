const express = require("express");
const router = express.Router();

const {
  getProductos,
  setProducto,
  getProducto,
  deleteProducto,
  updateProducto,
  getAdminProducts,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productsController"); //Tremos la respuesta json del controlador
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/productos").get(getProductos); //Establecemos desde que ruta queremos ver getProducts

router
  .route("/productos")
  .post(isAuthenticatedUser, authorizeRoles("admin"), setProducto); //Establecemos la ruta para crear un producto

router.route("/productos/:id").get(getProducto); //Establecemos la ruta para obtener un producto por id

router
  .route("/productos/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProducto); //Establecemos la ruta para eliminar un producto por id

router
  .route("/productos/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProducto); //Establecemos la ruta para eliminar un producto por id

//sacado del git:
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/review").delete(isAuthenticatedUser, deleteReview);

//Rutas admin

router
  .route("/admin/productos")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts); //establecemos la ruta

module.exports = router;
