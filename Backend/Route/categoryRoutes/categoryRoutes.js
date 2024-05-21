const express = require('express');
const categoryRouter = express.Router();

const {addCategory, showCategory, updateCategory, totalCategory} = require('../../Controller/Category/category')

categoryRouter.post("/add_category", addCategory);
categoryRouter.get("/show_category", showCategory);
categoryRouter.patch("/edit_category/:cid", updateCategory);

categoryRouter.get("/total_category", totalCategory)


module.exports = categoryRouter