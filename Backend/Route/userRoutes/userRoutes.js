const express = require('express');
const userRouter = express.Router();

const upload = require('./multerImage')

const {addUsers, getUsers,updateUsers} = require('../../Controller/Users/user')
const {updateStatusActive, updateStatusDeactive} = require('../../Controller/Users/user')
const {totalusers,userDetails} = require('../../Controller/Users/user')

userRouter.post("/add_users", upload.single('image') , addUsers)
userRouter.get("/get_users", getUsers)
userRouter.patch("/update_users/:uid", updateUsers)


userRouter.patch("/status_active/:uid", updateStatusActive)
userRouter.patch("/status_deactive/:uid", updateStatusDeactive)

userRouter.get("/total_users", totalusers)
userRouter.get("/user_detailes/:uid", userDetails)

module.exports = userRouter