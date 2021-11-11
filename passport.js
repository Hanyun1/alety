const LocalStrategy = require("passport-local").Strategy;
const PassportJWT = require("passport-jwt");
const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;

const Users = require("./models/UserModel");

require("dotenv").config();

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (_id, done) {
    Users.findById(_id, function (err, user) {
      done(err, user);
    });
  });
  // used to demonstrate JWT
  let opts = {};
  // extract token information
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // key that was used to hash the token
  opts.secretOrKey = process.env.SECRET;

  // depending on what data you store in your token, setup a strategy
  // to verify that the token is valid....
  passport.use(
    "jwt",
    new JwtStrategy(opts, (jwt_payload, done) => {
      // here I'm simply searching for a user with the email addr
      // that was added to the token
      Users.findOne({ emailAddress: jwt_payload.body._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
  //create a passport to handle user login
  passport.use(
    "userLogin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          //Find the user associated with the email provided by the user
          Users.findOne({ emailAddress: email }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, { message: "No user found." });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: "Oops! Wrong password." });
            } else {
              console.log("SUCCESS");
              return done(null, user, { message: "Login successful" });
            }
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
