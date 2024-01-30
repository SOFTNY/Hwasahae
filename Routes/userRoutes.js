const express = require("express");
const multer = require("multer");
const form_data = multer();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserInfo,
  removeUserInfo,
  getUsers,
  getAuthNo,
} = require("../Controllers/userControlloer");
const {
  validate,
  userRegisterValidator,
  userLoginValidator,
  userEmailValidator,
} = require("../error/userValidator");
const authJWT = require("../utils/authJWT");
const router = express.Router();

router.post(
  "/register",
  form_data.array(),
  userRegisterValidator(),
  validate,
  registerUser
);
router.post(
  "/login",
  form_data.array(),
  userLoginValidator(),
  validate,
  loginUser
);
router.post("/sendEmail", userEmailValidator(), validate, getAuthNo);
router.post("/logout", logoutUser);
router.get("/users/my", authJWT, getUserInfo);
router.patch("/users/my", authJWT, updateUserInfo);
router.delete("/users/my", authJWT, removeUserInfo);
router.get("/users", authJWT, getUsers);

module.exports = router;
