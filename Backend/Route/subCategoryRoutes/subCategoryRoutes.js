const express = require('express')
const subCatRouter = express.Router();

const upload = require('../../Route/userRoutes/multerImage')

const { addSubCategory, viewSubCategory, updateSubCategory, deleteSubCategory, totalSubCategory } = require('../../Controller/Sub Category/subCategory');

subCatRouter.post("/add_subCategory", upload.single('image'), addSubCategory)
subCatRouter.get("/view_subCategory", viewSubCategory)
subCatRouter.patch("/update_subCategory/:subcatid", upload.single('image'), updateSubCategory)
subCatRouter.delete("/delete_subCategory/:subcatid", deleteSubCategory)

subCatRouter.get("/total_subcategory", totalSubCategory)


module.exports = subCatRouter