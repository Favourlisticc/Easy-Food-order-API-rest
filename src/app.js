const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const path = require('path');

//importing routes
const index = require('./routes/index')



const app = express()

//database calling
require('./Configure/mongodb')


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


//PORT
const Port = 3002;

//app starting listen
app.listen(Port, console.log(`Server running in ${process.env.NODE_ENV} model on ${Port}`))