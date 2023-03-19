const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/schemas/signin')


passport.serializeUser((user, done) => {
    console.log('serializing user');
    console.log(user);
    done(null, user.id);

  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
      console.log(user)

    } catch (err) {
      done(err);
      console.log(err)
    }
  });

  