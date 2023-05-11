const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const stratrgy = require('./strategy/signup')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const mime = require('mime');

require('./database/models/user')
require('./database/mongodb')

const app = express()

//importing routes
const index = require('./routes/index')
const auth = require('./routes/auth')
const user = require('./routes/user')
const admin = require('./routes/admin')
const account = require('./routes/account')
const product = require('./routes/adminproduct')
const category = require('./routes/category')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up session cookies
app.use(session(
{
  secret: 'AVJHJHGFYTFYFUYFKIJOYOLMLSZKK',
  resave: false,
  saveUninitialized: false,
  store : mongoStore.create({
    mongoUrl: 'mongodb+srv://favour:favoursu@cluster0.1i4m3zl.mongodb.net/foodweb'
  })
}
))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//Static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('*.js', (req, res, next) => {
  res.type('application/javascript');
  next();
});

//logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//join views path for hbs
const viewspath = path.join(__dirname, './view')
console.log(viewspath)

//handlebars for views
app.engine('hbs',exphbs.engine({defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', viewspath)




//calling routes so we can use it
app.use('/', index)
app.use('/auth', auth)
app.use('/user', user)
app.use('/admin', admin)
app.use('/dashboard', account)
app.use('/admin/dashboard/product', product)
app.use('/admin/dashboard/category', category)


// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// cloudinary.config({
//   cloud_name: "dwe8h5aqc",
//   api_key: "478185315828577",
//   api_secret: "pViJOMPLiMdwTWNplLeAfLYx9eM"
// });

// app.post('/upload', upload.single('image'), (req, res) => {
//   // Use cloudinary to upload the image
//   cloudinary.uploader.upload(req.file.path, (error, result) => {
//     if (error) {
//       console.error(error);
//       return res.redirect('/error');
//     }
//     // Save the result to your database or do something else with it
//     console.log(result);
//     res.send('sucessful');
//   });
// });




//PORT
const Port = 3002;

//app starting listen
app.listen(Port, console.log(`Server running in ${process.env.NODE_ENV} model on ${Port}`))