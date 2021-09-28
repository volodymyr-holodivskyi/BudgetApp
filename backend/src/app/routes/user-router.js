const express = require("express");


const userRouter = express.Router();

userRouter.get('/',function(req,res){
    res.send("Hello World")
})

module.exports = userRouter;