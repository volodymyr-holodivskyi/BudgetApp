const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const ExtractJWT = passportJWT.ExtractJwt;
const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

const { getUserByEmail, getUserIncomes, getUserSavings, getUserSpends } = require("../services/users-service");
const config = require("../config");

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  done(null, email);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async function (email, password, cb) {
      return getUserByEmail(email)
        .then(async rows => {
          if (rows.length === 0) {
            return cb(null, false, { message: "User was not found" });
          }
          const validPassword = bcrypt.compareSync(password, rows[0].password);
          if (!validPassword) {
            return cb(null, false, { message: "Incorrect password" });
          }
          let user = rows[0];
          await getUserIncomes(email).then(rows=>user.incomes=rows);
          await getUserSavings(email).then(rows=>user.savings=rows);
          await getUserSpends(email).then(rows=>user.spends=rows);
          return cb(null, user, {
            message: "Logged In Successfully",
          });
        })
        .catch((err) => cb(err, false, { message: "Error" }));
    }
  )
);
 
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.SECRET_KEY,
    },
    function (jwtPayload, cb) {
      const expirationDate = new Date(jwtPayload.exp * 1000);
      if (expirationDate < new Date()) {
        return cb(null, false);
      }
      cb(null, jwtPayload.user);
    }
  )
);

////////////////////////////////////////////////////////////////////////////////////////////////////////
let refreshTokens = {};
function loginAuthenticate(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      console.log(err);
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : "Login failed",
          user: user,
        });
      }
  
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
  
        const token = jwt.sign({ user: user }, config.SECRET_KEY, {
          expiresIn: 60,
        });
        let refreshToken = randToken.uid(256);
        refreshTokens[refreshToken] = user.email;
        return res.json({ user: user, token: token, refreshToken: refreshToken });
      });
    })(req, res);
  }
 
  function generateToken(req, res, next) {
    const email = req.body.email;
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens && refreshTokens[refreshToken] === email) {
      getUserByEmail(email)
        .then((rows) => {
          const token = jwt.sign({ user: rows[0] }, config.SECRET_KEY, {
            expiresIn: 60,
          });
          return res.json({ email: email, token: token });
        })
        .catch((err) => res.status(401).json({ message: "Unauthorized" }));
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

module.exports={
    loginAuthenticate,
    generateToken
}