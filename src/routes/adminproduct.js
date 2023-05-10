const { Router } = require('express');
const router = Router();
const User = require('../database/models/user');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Product = require("../database/models/products")


// const expressUploader = require("express-fileupload");
// const nodefetch = require('node-fetch')

// router.use(expressUploader());

// const path = require('path')

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: '/public/uploads/',
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     console.log(file)
//   }
// });

// const upload = multer({ storage: storage,
//   limits:{fileSize: 1000000},
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('image');

// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "****",
  api_key: "****",
  api_secret: "****"
});

router.get('/add-product', async(req, res)=>{
    const user = await User.findById({_id: req.user._id}).lean();
  res.render('add-product', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
})


router.post('/add-product', upload.single('image'), async(req, res) => {
  // Use cloudinary to upload the image
  const user = await User.findById({_id: req.user._id}).lean();

  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      console.error(error);
      return res.redirect('/error');
    }
    // Save the result to your database or do something else with it
    console.log(result);

    try {
        const title = req.body.title;
        const imageUrl = result;
        const price = req.body.price;
        const description = req.body.description;
        const category = req.body.category;
      
        console.log('req', req.file);
        if(!imageUrl){
          //req.flash('error', 'Invalid file format.');
          return res.redirect('/admin/dashboard/product/add-product');
        }
        const product = new Product({
          title: title,
          price: price,
          description: description,
          image: '/' + imageUrl.path,  //absolute path
          category: category,
        });
      
      
          product.save();
          console.log(product)
          res.render('add-product', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin',
          msg: "Successfully Upload"
    });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'An error occurred while saving the product.' });
        }
  });
});
// router.get('/category', async(req, res)=>{
//   const user = await User.findOne({_id: req.user._id}).lean();
// res.render('category', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
// })

// router.post('/add-product', (req, res) =>{
//   upload(req, res, (err) => {
//     if(err){
//       res.render('add-product', {
//         msg: err
//       });
//     } else {
//       if(req.file == undefined){
//         res.render('add-product', {
//           msg: 'Error: No File Selected!'
//         });
//       } else {
//         res.render('add-product', {
//           msg: 'File Uploaded!',
//           file: `uploads/${req.file.filename}`
//         });
//       }
//     }
//   });
// //
//   });

//   router.post('/upload', (req,res) =>{
//     console.log(req.files)
//     nodefetch(
//       "https://www.filestackapi.com/api/store/S3?key=AuzxRI7UmQZCaKPmRNNgKz",
//       {
//         method: "POST",
//         headers: { "Content-Type" : "image/png" },
//         body: req.files.image.data,
//       }

//     )
//     .then((r) => r.json)
//     .then((r) => {
//       console.log(r)
//       res.send(r)
//     })

//   })
module.exports = router