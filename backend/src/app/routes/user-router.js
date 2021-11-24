const express = require("express");
const { moveIncomeIntoSavings, moveSavingsIntoSpends, getUserInfo, UpdateUserBalance, checkPassword, updateUserProfile, changeUserAvatatImage } = require("../controllers/user-controller");
const { updateUserLastVisitDate } = require("../services/users-service");


const userRouter = express.Router();

userRouter.post('/save',moveIncomeIntoSavings);
userRouter.post('/spend',moveSavingsIntoSpends);
userRouter.post('/edit',updateUserProfile);
userRouter.post('/password/check',checkPassword);
userRouter.post('/avatar',changeUserAvatatImage);
userRouter.get('/get',getUserInfo);

module.exports = userRouter;