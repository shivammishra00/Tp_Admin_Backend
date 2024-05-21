const express = require('express');
const adminRouter = express.Router();

const {adminLogin, totalAdmin} = require('../../Controller/adminConroller/adminLogin')
const {adminLogout} = require('../../Controller/adminConroller/adminLogut')

adminRouter.post("/adminlogin", adminLogin)
adminRouter.get("/total_admin", totalAdmin)
adminRouter.get("/adminlogout", adminLogout)

module.exports =  adminRouter