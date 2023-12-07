const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://favoursunday:favoursu55@cluster0.6es08zq.mongodb.net/foodweb")
    .then(() => console.log(`Connected to DB`))
    .catch((err) => console.error(err));