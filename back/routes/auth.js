const express = require("express");
const router = express.Router();

const {
  setUsuario,
  getUsuarios,
  getUsuario,
  deleteUsuario,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/usuario").post(setUsuario);
router.route("/usuario").get(getUsuarios);
router.route("/usuario/:id").get(getUsuario);
router.route("/usuario/:id").delete(deleteUsuario);
router.route("/login").get(loginUser);
router.route("/logout").get(isAuthenticatedUser, logOut);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").post(resetPassword);

module.exports = router;
