const { Router } = require('express')
const router = Router();
const users = require('../database/models/user')
const { ensureUnauthUser, enSureMainUser} = require('../middleware/auth')
const listproduct = require('../database/models/products')
const Contact = require('../database/models/contactus');

const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');



// req Get for landing page
router.get('/', (req, res) =>{
    res.render("landingpage", {
        layout: 'landingpage',
    })
})

// req Get for login page
router.get('/login', (req, res) =>{
    res.render("login", {
        layout: 'login',
    })
})

// req Get for signup page
router.get('/signup', (req, res) =>{
    res.render("signup", {
        layout: 'signup',
    })
})

// req Get for dashboard
router.get('/dashboard', ensureUnauthUser, async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user._id }).lean()
    const products = await listproduct.find().lean();
        res.render('dashboard', {
          user, req: req,
          username: req.user.firstName,
          products
        });

}catch(err){
  console.log(err)

}
});



// req Get for about-us
router.get('/about-us', (req, res) =>{
    res.render("aboutus", {
      layout: 'landingpage',
    })
})

// req Get contact-us page
router.get('/contactus', (req, res) =>{
    res.render("contactus", {
      layout: 'landingpage',
    })
})

//
router.post('/contactus', (req, res) => {
  // Extract form data
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

  let config = {
    service: 'gmail',
    auth: {
      user: "****",
      pass: "*****"
    }
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: `F <b style="color: red;" >OO </b>D!`,
      link: 'Food.com'
    }
  });

  let response = {
    body: {
      name: `${fullname}`,
      intro: `Thank you for reaching out to us.`,
      outro: 'We have received your message and will be in touch as soon as possible. In the meantime, please feel free to visit our website or contact us again if you have any further questions.'
    }
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "melondyguy@gmail.com",
    to: req.body.email,
    subject: "Thank you for your patience and understanding.",
    html: mail
  };

  try {
    transporter.sendMail(message);
    newContact.save();

    res.render("contactus", { sent: "Form submitted <i class='fas fa-check-circle'></i>", layout: 'landingpage',});
    console.log("message sent");
  } catch (err) {
    console.error(err);
  }
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});



module.exports = router;