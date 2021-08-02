// External Imports
const express = require("express");

// Internal Imports
const {
  getInbox,
  searchUser,
  addConversation,
  getMessages,
  sendMessage,
} = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");

const router = express.Router();

// Inbox Page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

// Search user for conversation
router.post("/search", checkLogin, searchUser);

// Add conversation
router.post("/conversation", checkLogin, addConversation);

// Get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);

// Send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
