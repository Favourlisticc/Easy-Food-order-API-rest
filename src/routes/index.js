const { Router } = require('express')
const router = Router();

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
router.get('/dashboard', (req, res) =>{
    res.render("dashboard")
})

// req Get for about-us
router.get('/about-us', (req, res) =>{
    res.render("aboutus", {
      layout: 'landingpage',
    })
})

// req Get contact-us page
router.get('/contact-us', (req, res) =>{
    res.render("contactus", {
      layout: 'landingpage',
    })
})



module.exports = router;