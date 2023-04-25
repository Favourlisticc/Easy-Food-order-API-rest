const express = require('express');
const router = express.Router();
const users = require('../database/schemas/user')
const { ensureUnauthUser, enSureMainUser} = require('../middleware/auth')

router.get('/profile',  ensureUnauthUser, async (req, res) => {
  // Retrieve user data from database and render the account page with user data and a flag indicating whether the user is logged in or not
  const user = await users.findOne({_id: req.user._id}).lean();
  res.render('account', { user, isLoggedIn: req.isAuthenticated(), req });
});

module.exports = router;