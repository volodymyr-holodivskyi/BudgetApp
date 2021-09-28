const express = require("express");
const authRouter = express.Router();

const { loginAuthenticate, generateToken } = require("../controllers/auth-controller");



/* POST login. */
authRouter.post("/", loginAuthenticate);
authRouter.post("/token", generateToken);


module.exports = authRouter;