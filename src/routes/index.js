const { Router } = require('express')
const router = Router();

// req Get for landing page
router.get('/', (req, res) =>{
    res.render("landingpage", {
        layout: 'landingpage',
    })
})

// req Get for dashboard
router.get('/login', (req, res) =>{
    res.render("login", {
        layout: 'login',
    })
})
router.get('/signup', (req, res) =>{
    res.render("signup", {
        layout: 'signup',
    })
})

// req Get for dashboard
router.get('/dashboard', (req, res) =>{
    res.render("dashboard")
})



module.exports = router;