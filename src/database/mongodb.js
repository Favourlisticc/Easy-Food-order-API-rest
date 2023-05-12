const mongoose = require('mongoose')

mongoose
.connect('//')
.then(() => console.log(`connected to DB`))
.catch((err) => console.log(err));