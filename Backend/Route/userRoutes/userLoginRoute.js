const express = require('express');
const userLoginRouter = express.Router();

const {userLogin, userLogout} = require('../../Controller/Users/userLogin')

userLoginRouter.post("/user_login", userLogin)
userLoginRouter.get("/user_logout", userLogout)

module.exports = userLoginRouter