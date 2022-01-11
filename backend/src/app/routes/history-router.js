const express = require("express");
const { getUserHistory, addToHistory } = require("../controllers/history-controller");
const historyRouter = express.Router();

historyRouter.get('/',getUserHistory);
historyRouter.post('/addPost',addToHistory);

module.exports = historyRouter;