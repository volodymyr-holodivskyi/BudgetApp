const express = require("express");
const { getUserStats } = require("../controllers/statistic-controller");
const statisticRouter = express.Router();

statisticRouter.get('/',getUserStats)


module.exports = statisticRouter;