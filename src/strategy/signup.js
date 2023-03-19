const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/schemas/signin');
const { hashPassword, comparePassword} = require('../utils/hashcomp')

passport.serializeUser((user, done) => {
  console.log('Serializing user');
  console.log(user)
  done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializing")
    console.log(id)
    done(null, user);

  } catch (err) {
    done(err);
    console.log(err)
  }
});

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
async (req, email, password, done) => {
  console.log(email)
  console.log(password)
  try {
    if (!email || !password) {
      return done(null, false, { message: 'Missing email or password' });
    }
    const hashPasswor = await hashPassword(password);

    // Check if a user already exists with the given email address
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return done(null, false, { message: 'A user with this email address already exists' });
    }

    // Create a new user object with the provided email and password
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPasswor
    });

    // Return the new user
    return done(null, newUser);
  } catch (err) {
    console.log(err)
  }
}
));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
 },
  async (email, password, done) => {
      console.log(email)
      console.log(password)
      try {
          if(!email || !password) {
              done(new Error ("Your credentials are not valid"))
          }
          const userDB = await User.findOne({ email })
          if(!userDB) throw new Error('User not found')
          const isValid = comparePassword(password, userDB.password)
          if(isValid) {
              console.log('Authenticated Successfully');
              done(null, userDB);
          }else{
              console.log('Invalid Authentication');
              done(null, null)
          }
      }catch (err) {
        console.log(err)
      }
  }
)
)