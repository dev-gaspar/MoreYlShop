const express = require("express");
const router = express.Router();

const {
  setUsuario,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/usuario/registro").post(setUsuario);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logOut);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").post(resetPassword);

router.route("/yo").get(isAuthenticatedUser, getUserProfile);
router.route("/yo/updatePassword").put(isAuthenticatedUser, updatePassword);
router.route("/yo/updateProfile").put(isAuthenticatedUser, updateProfile);

//rutas admin
router
  .route("/admin/allUsers")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails);
router
  .route("/admin/updateUser/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);
router
  .route("/admin/deleteUser/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
