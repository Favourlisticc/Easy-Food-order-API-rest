const { Router } = require('express')
const passport = require('passport')
const User = require('../database/schemas/signin')
const passserialize = require('../strategy/signup')


const router = Router();

// post req to signup auth
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
}));

// post req to login auth
router.post('/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

// get req to google-auth auth
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}), )

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/signup'}), (req, res) =>{
    res.redirect('/dashboard')
})

// router.get('/discord', passport.authenticate('discord'), (req, res) =>{
//     res.send(200)
// })

// router.get('/discord/redirect', passport.authenticate('discord'), (req, res) =>{
//     res.send(200)
// })

// module.exports = router;

module.exports = router