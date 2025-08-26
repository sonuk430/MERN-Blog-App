const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories/categories");
const isLogin = require("../../middlewares/isLogin");

const categoryRouter = express.Router();

// create
categoryRouter.post("/", isLogin, createCategory);
//?all
categoryRouter.get("/", getCategories);
//Update
categoryRouter.put("/:id", isLogin, updateCategory);
//Delete
categoryRouter.delete("/:id", isLogin, deleteCategory);

module.exports = categoryRouter;
