const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../database/schemas/user');
const { hashPassword, comparePassword} = require('../utils/hashcomp')
const GoogleStrategy = require('passport-google-oauth20').Strategy


//serializing and deserializing user middleware
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


// passport signup strategy using local-passport strategy
passport.use('signup', new LocalStrategy({
  usernameField: 'email' + 'username',
  passwordField: 'password',
  passReqToCallback: true
},
async (req, email, password, username, done) => {
  console.log(email)
  console.log(password)
  console.log(username)
  try {
    if (!email || !password) {
      return done(null, false, { message: 'Missing email or password' });
    }
    const hashPasswor = await hashPassword(password);

    // Check if a user already exists with the given email address
    const existingUser = await User.findOne({ email });
    const existingUserusername= await User.findOne({ username })


    if (existingUser) {
      console.log("A user with this email address already exists")
      return done(null, false, { message: 'A user with this email address already exists' });
    }
    if (existingUserusername) {
      console.log("A user with this username already exists")
      return done(null, false, { message: 'A user with this username already exists' });
    }

    // Create a new user object with the provided email and password
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashPasswor
    });
    console.log('Authenticated Successfully');
    done(null, userDB);

    // Return the new user
    return done(null, newUser);
  } catch (err) {
    console.log(err)
  }
}
));

// passport login strategy using local-passport strategy
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
          const existingUserGoogle = await User.findOne({ email })
          if(!userDB || !existingUserGoogle) throw new Error('User not found')
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

// passport google strategy using passport-google-auth20
passport.use('google', new GoogleStrategy({
  clientID: '***',
  clientSecret: '***',
  callbackURL: "****"
},
async(accessToken, refreshToken, profile, done) => {
  console.log(profile)

  const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.familyName,
      lastName: profile.name.givenName,
      email: profile.emails[0].value,
      image: profile.photos[0].value,

  }

  try{
      let user = await User.findOne({email: profile.emails[0].value})
  if(user){
      done(null, user)
  }else{
      user = await User.create(newUser)
      done(null, user)
  }
}catch(err){
console.log(err)
}
}
));