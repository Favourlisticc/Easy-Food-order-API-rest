// Require Router from express
const { Router } = require('express');
const router = Router();
const User = require('../database/models/user');
const listproduct = require('../database/models/products')


// Define middleware to check for admin access
const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('Access denied.');
    console.log('No admin At the moment');
  }
  next();
}

User.grantAdminAccess('6571f6a38de2010f221361bb')
  .then(user => {
    console.log(`User ${user.firstName} granted admin access.`);
  })
  .catch(err => {
    console.log(err);
  });


// Define routes that require admin access
router.get('/dashboard', async (req, res) => {
  // Render the admin dashboard
  try {
    const user = await User.findOne({ _id: req.user._id }).lean()
    const products = await listproduct.find().lean();

    res.render('admindashboard', {
          user, req: req,
          firstName: req.user.firstName,
          layout: 'admin',
          products
        });

}catch(err){
  console.log(err)
}
});

router.get('/account', async (req, res) => {
  // Retrieve user data from database and render the account page with user data and a flag indicating whether the user is logged in or not
  const user = await User.findOne({_id: req.user._id}).lean();
  res.render('admin-account', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
});

router.get('/admin/users', requireAdmin, (req, res) => {
  // Render the user management page
  res.render('admin/users');
});

module.exports = router;