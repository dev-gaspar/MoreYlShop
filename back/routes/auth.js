const express = require("express");
const router = express.Router();

const {
  setUsuario,
  getUsuarios,
  getUsuario,
  deleteUsuario,
  loginUser,
} = require("../controllers/authController");

router.route("/usuario").post(setUsuario);
router.route("/usuario").get(getUsuarios);
router.route("/usuario/:id").get(getUsuario);
router.route("/usuario/:id").delete(deleteUsuario);
router.route("/login").get(loginUser);

module.exports = router;
