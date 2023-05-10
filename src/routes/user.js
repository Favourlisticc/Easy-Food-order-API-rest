const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const User = require('../database/models/user')
const { ensureUnauthUser, enSuremainUser} = require('../middleware/auth')


router.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Search for the user data in the database
  User.findOne({ id: userId }, (err, userData) => {
    if (err) {
      console.log('Search error:', err);
      res.status(500).send('Server error');
    } else if (userData) {
      res.status(200).json(userData); // Return search results as JSON response
    } else {
      res.status(404).send('User not found');
    }
  });
});




// // fetch users api
// router.get('/', auth, async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     const users = await User.find({}, { password: 0, _id: 0, googleId: 0 })
//       .sort('-created')
//       .populate('merchant', 'name')
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     const count = await User.countDocuments();

//     res.status(200).json({
//       users,
//       totalPages: Math.ceil(count / limit),
//       currentPage: Number(page),
//       count
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// router.get('/me', auth, async (req, res) => {
//   try {
//     const user = req.user._id;
//     const userDoc = await User.findById(user, { password: 0 }).populate({
//       path: 'merchant',
//       model: 'Merchant',
//       populate: {
//         path: 'brand',
//         model: 'Brand'
//       }
//     });

//     res.status(200).json({
//       user: userDoc
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// router.put('/', auth, async (req, res) => {
//   try {
//     const user = req.user._id;
//     const update = req.body.profile;
//     const query = { _id: user };

//     const userDoc = await User.findOneAndUpdate(query, update, {
//       new: true
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Your profile is successfully updated!',
//       user: userDoc
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

module.exports = router;
