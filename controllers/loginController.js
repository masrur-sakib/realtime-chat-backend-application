// External Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// Internal Imports
const User = require("../models/People");

// Get Login Page
function getLogin(req, res, next) {
  res.render("index");
}

// Login
async function login(req, res, next) {
  // Process Login
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isPasswordValid) {
        const userObject = {
          userid: user._id,
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          avatar: user.avatar || null,
          role: user.role || "user",
        };

        // Prepare JWT Token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // Set Cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // Send data to the client side
        res.locals.loggedInUser = userObject;

        res.redirect("inbox");
      } else {
        throw createError("Login Failed! Please try again.");
      }
    } else {
      throw createError("Login Failed! Please try again.");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// Logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged Out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
