const express = require("express");
const { getUserSettingsC } = require("../controllers/settings-controller");

const settingsRouter = express.Router();

settingsRouter.get('/',getUserSettingsC);


module.exports = settingsRouter;