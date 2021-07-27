// External Imports
const express = require("express");

// Internal Imports
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

// Inbox Page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
