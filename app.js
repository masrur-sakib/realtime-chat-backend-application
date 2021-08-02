// External Imports
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

// Internal Imports
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const inboxRouter = require("./routers/inboxRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler.js");

const app = express();
const server = http.createServer(app);
dotenv.config();

// Socket Initialization
const io = require("socket.io")(server);
global.io = io;

// Set moment as app locals
app.locals.moment = moment;

// Database Connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connection Successful."))
  .catch((err) => console.log(err));

// Request Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set View Engine
app.set("view engine", "ejs");

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Parse Cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing Setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// Error Handling
// 404 Not found error handler
app.use(notFoundHandler);

// Common error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`App listening to port ${process.env.PORT}.`);
});
