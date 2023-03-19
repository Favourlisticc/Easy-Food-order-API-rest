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



require('./database/schemas/signin')

require('./database/mongodb')

const app = express()

//importing routes
const index = require('./routes/index')
const auth = require('./routes/auth')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up session cookies
app.use(session(
{
  secret: 'AVJHJHGFYTFYFUYFKIJOYOLMLSZKK',
  resave: false,
  saveUninitialized: false,
  store : mongoStore.create({
    mongoUrl: 'mongodb+srv://favour:favoursu@cluster0.1i4m3zl.mongodb.net/test'
  })
}
))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//Static folder
app.use(express.static(path.join(__dirname, 'public')))

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
app.use('/', auth)


//PORT
const Port = 3002;

//app starting listen
app.listen(Port, console.log(`Server running in ${process.env.NODE_ENV} model on ${Port}`))