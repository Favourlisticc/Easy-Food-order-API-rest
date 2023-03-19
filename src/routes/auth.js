const { Router } = require('express')
const passport = require('passport')
const User = require('../database/schemas/signin')
const passserialize = require('../strategy/signup')


const router = Router();

// router.post('/signup', passport.authenticate('signup', { failureRedirect: '/signup', failureFlash: true}), (req, res)=>{
//   res.redirect('/dashboard')
//   });

//   const { Router, request, response } = require('express')
//  const User = require('../database/schema/user');
//  const passport = require('passport')
// const { route } = require('./groceries');
// const { hashPassword, comparePassword} = require('../utils/haspassword');
// const authRegisterFunction = require('../controllers/auth')

// const router = Router();

//  /*router.post('/login', async(request, response) =>{
//    const { email, password } = request.body;
//     if(!email || !password) {
//     return response.status(400).json({error: 'Email and password are required'});
//     }
//     const userDB = await User.findOne({email});
//     if(!userDB) {return response.status(401).json({error: "email not correct"});}

//     const validPassword = comparePassword(password, userDB.password) 
//     if(validPassword) {
//         console.log('Your have been Authenticated')
//         request.session.username = userDB
//         return response.send(200)
//     }else{
//         console.log('Your have not been Authenticated')
//         return response.status(401).json({error: "password not correct"})
//     }

// })*/

// router.post('/login', passport.authenticate('local'), (req, res) =>{
//     console.log('Logged in')
//     res.send(200)
// })

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.post('/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

// router.get('/discord', passport.authenticate('discord'), (req, res) =>{
//     res.send(200)
// })

// router.get('/discord/redirect', passport.authenticate('discord'), (req, res) =>{
//     res.send(200)
// })

// module.exports = router;

module.exports = router