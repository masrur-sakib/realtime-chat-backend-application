// External Imports
const express = require("express");
const { check } = require("express-validator");

// Internal Imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidators");

const router = express.Router();

// Users Page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// Add User
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidatorHandler,
  addUser
);

// Remove User
router.delete("/:id", removeUser);

module.exports = router;
