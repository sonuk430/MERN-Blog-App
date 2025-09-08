const asyncHandler = require("express-async-handler");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const Category = require("../../model/Category/Ctegory");
// @Desc Create  Post
//@route  POST/api/v1/post
//@access Private

exports.createPost = asyncHandler(async (req, res) => {
  // Get the payload
  const { title, image, content, categoryId } = req.body;
  // check if post exists
  const postFound = await Post.findOne({ title });
  if (postFound) {
    throw new Error("Post already exists");
  }
  // create post
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });
  //!Associate post to user
  await User.findByIdAndUpdate(
    req.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  //*Push post into category

  await Category.findByIdAndUpdate(
    req.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  //? Send the response
  res.json({
    status: "success",
    message: "Post successfully created",
    post,
  });
});

// @Desc get all  Posts
//@route GET /api/v1/posts
//@access Public
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("comments");

  res.status(201).json({
    status: "success",
    message: "Posts successfully fetch",
    posts,
  });
});

// @Desc get single  Posts
//@route GET /api/v1/posts/:id
//@access Public
exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Post successfully fetch",
    post,
  });
});

// @Desc delete  post
//@route DELETE /api/v1/posts/:id
//@access Private

exports.deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Post successfully deleted",
  });
});

// @Desc update  Post
//@route PUT /api/v1/posts/:id
//@access Private

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    message: "Post successfully updated",
    post,
  });
});
