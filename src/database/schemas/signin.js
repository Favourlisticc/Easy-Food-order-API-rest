const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
   default: new Date()
},
});

const SignUp = mongoose.model('SignUp', signUpSchema);

module.exports = SignUp;