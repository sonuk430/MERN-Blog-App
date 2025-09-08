const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
} = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");

const usersRouter = express.Router();

//!Register
usersRouter.post("/register", register);
//!Login
usersRouter.post("/login", login);
//!profile
usersRouter.get("/profile", isLogin, getProfile);

//!block User
usersRouter.put("/block/:userIdToBlock", isLogin, blockUser);
//!unblock User
usersRouter.put("/unblock/:userIdToUnBlock", isLogin, unblockUser);

// * Export
module.exports = usersRouter;
