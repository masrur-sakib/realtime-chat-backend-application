// External Imports
const express = require("express");

// Internal Imports
const { getLogin } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

// Login Page
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
