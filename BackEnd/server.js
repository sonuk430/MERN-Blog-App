const dotenv = require("dotenv").config();
const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
const {
  notFond,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");
const categoryRouter = require("./routes/category/categoryRouter");
const postRouter = require("./routes/post/postRouter");
const commentRouter = require("./routes/comment/commentRouter");
require("./config/database")();
//! Server
const app = express();

// middlewares
app.use(express.json()); // pass incoming data

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

//? not Found middleware
app.use(notFond);

//! Error middleware
app.use(globalErrorHandler);

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on port ${PORT}...`));
