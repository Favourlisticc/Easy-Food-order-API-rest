// Require Router from express
const { Router } = require('express');
const router = Router();
const users = require('../database/schemas/user')
const User = require('../database/schemas/user');


// Define middleware to check for admin access
const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('Access denied.');
    console.log('No admin At the moment');
  }
  next();
}

User.grantAdminAccess('6447b623c027284deb91f1c9')
  .then(user => {
    console.log(`User ${user.firstName} granted admin access.`);
  })
  .catch(err => {
    console.log(err);
  });
// Define routes that require admin access
router.get('/admin/dashboard', requireAdmin, (req, res) => {
  // Render the admin dashboard
  res.render('admin/dashboard');
});

router.get('/admin/users', requireAdmin, (req, res) => {
  // Render the user management page
  res.render('admin/users');
});

module.exports = router;