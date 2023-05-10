const { Router } = require('express')
const User = require('../database/models/user')
const Product = require('../database/models/products')

const router = Router();

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

router.get('/rawmeats', async(req, res)=>{
    const user = await User.findOne({_id: req.user._id}).lean();
  res.render('add-product', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
})

router.get('/cakes', async(req, res)=>{
  const user = await User.findOne({_id: req.user._id}).lean();
res.render('category', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
})

router.get('/drinks', async(req, res)=>{
    const user = await User.findOne({_id: req.user._id}).lean();
  res.render('add-product', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
})

router.get('/chickens', async(req, res)=>{
  const user = await User.findOne({_id: req.user._id}).lean();
res.render('category', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
})

router.get('/avaliable', async(req, res)=>{
    const user = await User.findOne({_id: req.user._id}).lean();
  res.render('avaliable', { user, isLoggedIn: req.isAuthenticated(), req, layout: 'admin'});
  })


//POST REQUEST FOR ADDING PRODUCTA TO DATABASE
router.post('/admin/uydashboard', upload.single("image"), async(req, res) =>{
  res.send("Image Uploaded")
// try {
//   const title = req.body.title;
//   const imageUrl = req.file;
//   const price = req.body.price;
//   const description = req.body.description;
//   const category = req.body.category;

//   console.log('req', req.file);
//   if(!imageUrl){
//     //req.flash('error', 'Invalid file format.');
//     return res.redirect('/admin/dashboard/product/add-product');
//   }
//   const product = new Product({
//     title: title,
//     price: price,
//     description: description,
//     image: '/' + imageUrl.path,  //absolute path
//     category: category,
//   });


//     await product.save();
//     res.status(201).json({ message: 'Product saved successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'An error occurred while saving the product.' });
//   }
  });




module.exports = router;