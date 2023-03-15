const express = require('express')
const morgan = require('morgan')

//importing routes
const index = require('./routes/index')



const app = express()

//database calling
require('./Configure/mongodb')

//logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}



//calling routes so we can use it
app.use('/', index)


//PORT
const Port = 3002;

//app starting listen
app.listen(Port, console.log(`Server running in ${process.env.NODE_ENV} model on ${Port}`))