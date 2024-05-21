const express = require('express');
const jwt = require('jsonwebtoken')
const verifyRouter = express.Router();

const {user} = require('../../Controller/Verify/verify')

const verifyUser = (req,res,next) =>{
    const token = req.cookies.token /// token ko fetch kar liya 
    if(token){
        jwt.verify(token, "jwt_secret_key", (err, decoded)=>{
            if(err) return res.json({Status: false, Error: "there are no token"})
            else{
                req.role = decoded.role,
                req.uid = decoded.uid,
                req.name = decoded.name
                next()
            }
        })
    }
    else{
        return res.json({Status: false, Error: "You are not authenticated"})
    }
}

verifyRouter.get("/verify", verifyUser, user)

module.exports = verifyRouter