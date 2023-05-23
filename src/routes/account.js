const express = require('express');
const router = express.Router();
const users = require('../database/models/user');
const { ensureUnauthUser, ensureMainUser } = require('../middleware/auth');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check the file type
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb('Invalid File type.');
    } else {
      // The file is valid, so return true
      cb(null, true);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

cloudinary.config({
  cloud_name: "*****",
  api_key: "*****",
  api_secret: "*****"
});

router.get('/', ensureUnauthUser, async (req, res) => {
  try {
    // Retrieve user data from the database
    const user = await users.findOne({ _id: req.user._id }).lean();
    res.render('account', { user, isLoggedIn: req.isAuthenticated(), req });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await users.findOne({_id: req.user._id}).lean();
    if (!user) {
      console.log('Search error:');
      res.status(500).send('Server error');
    } else {
      res.render('edit', { user, isLoggedIn: req.isAuthenticated() });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {

  const user = await users.findById(req.user._id).lean();

  try {
    // Get the user from the database
    if (!user) {
      return res.status(404).send('User not found');
    }

    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (error) {
        console.log(error);
        return res.render('edit', {
          user,
          isLoggedIn: req.isAuthenticated(),
          err: 'Image Cloding Error........'
        });}

      // Update the user with the data from the request
      const { firstName, lastName, username, email, phoneNumber } = req.body;
      const imageUrl = result.url;

      if (!imageUrl) {
        // Handle the case where the file upload failed
        return res.redirect('/edit');
      }
     console.log(result)
      // Update the user data in the database
      await users.findByIdAndUpdate(
        { _id: req.user._id },
        {
          firstName,
          lastName,
          username,
          email,
          image: imageUrl,
          phoneNumber,
        },
        { new: true }
      );

      console.log(users)
      // // Retrieve the updated user data
      // const updatedUser = await users.findOne({ _id: req.user._id }).lean();

      // Render the account page with the updated user data and a success message
      res.render('account', {
        user,
        isLoggedIn: req.isAuthenticated(),
        req,
        message: 'Successfully Uploaded'
      });
    });
  } catch (err) {
    console.error(err);
    // Handle the error and provide appropriate feedback to the user
    res.render('edit', {
      user,
      isLoggedIn: req.isAuthenticated(),
      error: 'Unsuccessful Updating....'
    });
  }
});

module.exports = router;