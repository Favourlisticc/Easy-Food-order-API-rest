const { Router } = require('express')
const router = Router();
const users = require('../database/models/user')
const { ensureUnauthUser, enSureMainUser} = require('../middleware/auth')
const products = require('../controllers/products')


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