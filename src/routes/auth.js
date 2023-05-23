const { Router } = require('express')
const passport = require('passport')
const User = require('../database/models/user')
const passserialize = require('../strategy/signup')

const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');



const router = Router();

// post req to signup auth
router.post('/signup',
passport.authenticate('signup', {
// successRedirect: '/dashboard',
// failureRedirect: '/signup',
// failureFlash: true
}), (req, res) => {

    const firstname = req.body.firstName;

  let config = {
        service : 'gmail',
        auth : {
            user: "*******",
            pass: "******"
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "salted",
      product : {
          name: `F <b style="color: red;" >OO </b>D!`,
          link : 'Food.com'
      }
  })

  let response = {
    body: {
        name : `${req.body.firstName}`,
        intro: `Welcome to F <b style="color: red;" >OO </b>D! We're excited to have you as a member.`,

        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
}

let mail = MailGenerator.generate(response)

let message = {
  from : "melondyguy@gmail.com",
  to : req.body.email,
  subject: "Welcome to FOOD!",
  html: mail
}
try{
  transporter.sendMail(message)
    return res.redirect('/dashboard')
  console.log("message sent")
  }
  catch(err) {
    return res.status(500).json({ err })
    console.log(err)
  }

  // Set authenticated user info on request object
  req.user = req.user;
});

// post req to login auth
router.post('/login',
passport.authenticate('login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}),
(req, res) => {
//   const { userEmail } = req.body;
//   let config = {
//         service : 'gmail',
//         auth : {
//             user: "**********,
//             pass: "*******"
//         }
//     }

//     let transporter = nodemailer.createTransport(config);

//     let MailGenerator = new Mailgen({
//       theme: "default",
//       product : {
//           name: "MAU",
//           link : 'Food.com'
//       }
//   })

//   let response = {
//     body: {
//         name : "Daily Tuition",
//         intro: "Your bill has arrived!",
//         table : {
//             data : [
//                 {
//                     item : "Nodemailer Stack Book",
//                     description: "A Backend application",
//                     price : "$10.99",
//                 }
//             ]
//         },
//         outro: "Looking forward to do more business"
//     }
// }

// let mail = MailGenerator.generate(response)

// let message = {
//   from : "*****",
//   to : req.body.email,
//   subject: "Place Order",
//   html: mail
// }
// try{
// transporter.sendMail(message)
//   return res.redirect('/dashboard');
// console.log("message sent")
// }
// catch(err) {
//   return res.status(500).json({ err })
//   console.log(err)
// }
  // Set authenticated user info on request object
  req.user = req.user;
});

// get req to google-auth auth
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}), )

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/signup'}),
(req, res) => {

  const firstname = req.body.firstName;

let config = {
      service : 'gmail',
      auth : {
          user: "***",
          pass: "*****"
      }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "salted",
    product : {
        name: `F <b style="color: red;" >OO </b>D!`,
        link : 'Food.com'
    }
})

let response = {
  body: {
      name : `${req.user.firstName}`,
      intro: `Welcome to F <b style="color: red;" >OO </b>D! We're excited to have you as a member.`,

      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
  }
}

let mail = MailGenerator.generate(response)

let message = {
from : "melondyguy@gmail.com",
to : req.user.email,
subject: "Welcome to FOOD!",
html: mail
}
try{
transporter.sendMail(message)
  return res.redirect('/dashboard')
console.log("message sent")
}
catch(err) {
  return res.status(500).json({ err })
  console.log(err)
}

// Set authenticated user info on request object
req.user = req.user;
});

module.exports = router