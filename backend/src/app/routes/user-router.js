const express = require("express");
const { moveIncomeIntoSavings, moveSavingsIntoSpends, getUserInfo } = require("../controllers/user-controller");


const userRouter = express.Router();

userRouter.post('/save',moveIncomeIntoSavings);
userRouter.post('/spend',moveSavingsIntoSpends);
userRouter.get('/get',getUserInfo)

module.exports = userRouter;