const express = require("express");
const { getUserHistory } = require("../controllers/history-controller");
const historyRouter = express.Router();

historyRouter.get('/',getUserHistory);


module.exports = historyRouter;