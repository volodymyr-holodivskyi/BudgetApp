const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const ExtractJWT = passportJWT.ExtractJwt;
const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

const { getUserByEmail, getUserIncomes, getUserSavings, getUserSpends, getUserById, updateUserLastVisitDate, setUserBalance, setUserExpences } = require("../services/users-service");
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
          if (!rows) {
            return cb(null, false, { message: "User was not found" });
          }
          const validPassword = bcrypt.compareSync(password, rows.password);
          if (!validPassword) {
            return cb(null, false, { message: "Incorrect password" });
          }
          let user = rows;
          await getUserIncomes(user.id).then(rows=>user.incomes=rows);
          await getUserSavings(user.id).then(rows=>user.savings=rows);
          await getUserSpends(user.id).then(rows=>user.spends=rows);
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
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        console.log(error);
        done(error);
      }
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
  
      req.login(user, { session: false },async (err) => {
        if (err) {
          res.send(err);
        }
  
        const token = jwt.sign({ user: user }, config.SECRET_KEY, {
          expiresIn: 300,
        });
        let refreshToken = randToken.uid(256);
        refreshTokens[refreshToken] = user.id;
        await setUserBalance(user.id).then(data=>user.balance=data);
        await setUserExpences(user.id).then(data=>user.expences=data);
        await updateUserLastVisitDate(user.id).then(data=>user.lastVisitDate=data);
        return res.json({ user: user, token: token, refreshToken: refreshToken });
      });
    })(req, res);
  }
 
  function generateToken(req, res, next) {
    const id = +req.body.id;
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens && refreshTokens[refreshToken] === id) {
      getUserById(id)
        .then((rows) => {
          const token = jwt.sign({ user: rows }, config.SECRET_KEY, {
            expiresIn: 300,
          });
          return res.json({ token: token });
        })
        .catch((err) => res.status(401).json({ message: err }));
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

module.exports={
    loginAuthenticate,
    generateToken
}