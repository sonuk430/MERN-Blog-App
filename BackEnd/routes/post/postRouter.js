const express = require("express");

const isLogin = require("../../middlewares/isLogin");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../../controllers/posts/posts");

const postRouter = express.Router();

// create
postRouter.post("/", isLogin, createPost);
// getting all
postRouter.get("/", getPosts);
//single post
postRouter.get("/:id", getPosts);
// update update
postRouter.patch("/:id", isLogin, updatePost);
// update delete
postRouter.delete("/:id", isLogin, deletePost);

module.exports = postRouter;
