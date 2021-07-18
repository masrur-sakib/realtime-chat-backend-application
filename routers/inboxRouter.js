// External Imports
const express = require("express");

// Internal Imports
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

// Inbox Page
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
