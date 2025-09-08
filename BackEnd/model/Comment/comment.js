const mongoose = require("mongoose");

// Schema

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    postsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

// compile schema to model

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
