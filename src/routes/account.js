const express = require('express');
const router = express.Router();
const users = require('../database/models/user')
const { ensureUnauthUser, enSureMainUser} = require('../middleware/auth')
const path = require('path')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../images')
  },
  filename: (req, file, cb) =>{
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

router.get('/profile',  ensureUnauthUser, async (req, res) => {
  // Retrieve user data from database and render the account page with user data and a flag indicating whether the user is logged in or not
  const user = await users.findOne({_id: req.user._id}).lean();
  res.render('account', { user, isLoggedIn: req.isAuthenticated(), req });
});


module.exports = router;