const { Router } = require('express')
const passport = require('passport')
const User = require('../database/models/user')
const passserialize = require('../strategy/signup')
const Contact = require('../database/models/contactus');


const router = Router();

// post req to signup auth
router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup',
  failureFlash: true
}), (req, res) => {
  // Set authenticated user info on request object
  req.user = req.user;
});

// post req to login auth
router.post('/login', passport.authenticate('login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  // Set authenticated user info on request object
  req.user = req.user;
});

// get req to google-auth auth
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}), )

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/signup'}), (req, res) =>{
    res.redirect('/dashboard')
})

//

router.post('/contactus', (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const subject = req.body.subject;
  const body = req.body.body;


  const newContact = new Contact({
    fullname: fullname,
    email: email,
    subject: subject,
    body: body
  });

  newContact.save()
    .then(() => {
        res.send(`
        <h1>Thank You!</h1>
        <p>Thanks for contacting us, ${fullname}! We'll get back to you at ${email} shortly.</p>
      `);
    })
    .catch((err) => {
      console.error(err);
      alert("Details Needed")
    });
});

module.exports = router