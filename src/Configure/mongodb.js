const mongoose = require('mongoose')

mongoose
.connect('mongodb+srv://favour:favoursu@cluster0.1i4m3zl.mongodb.net/foodweb')
.then(() => console.log(`connected to DB`))
.catch((err) => console.log(err));