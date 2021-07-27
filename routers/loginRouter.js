// External Imports
const express = require("express");

// Internal Imports
const { getLogin, login, logout } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");

const router = express.Router();

// Set page title
const page_title = "Login";

// Login Page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// Process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// Process logout
router.delete("/", logout);

module.exports = router;
