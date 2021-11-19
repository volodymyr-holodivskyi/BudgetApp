const express = require("express");
const { moveIncomeIntoSavings, moveSavingsIntoSpends, getUserInfo, UpdateUserBalance, checkPassword, updateUserProfile } = require("../controllers/user-controller");
const { updateUserLastVisitDate } = require("../services/users-service");


const userRouter = express.Router();

userRouter.post('/save',moveIncomeIntoSavings);
userRouter.post('/spend',moveSavingsIntoSpends);
userRouter.post('/edit',updateUserProfile);
userRouter.post('/password/check',checkPassword);
userRouter.get('/get',getUserInfo);

module.exports = userRouter;