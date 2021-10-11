const express = require("express");
const cors = require("cors");
const passport = require("passport");
const config = require("./app/config");
const userRouter = require("./app/routes/user-router");
const authRouter = require("./app/routes/auth-router");
const { dbInit } = require("./app/services/db-service");

require("./app/controllers/auth-controller");



const corsOptions = { origin: "*", credentials: true };
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  "/api",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
app.use("/auth", authRouter);

app.listen(config.PORT, () => {
  dbInit();
  console.log(`Listen on port ${config.PORT}`);
});