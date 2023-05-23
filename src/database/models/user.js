const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  },
  image: {
    type: String
},
phoneNumber: {
  type: String
},

  createdAt: {
    type: Date,
   default: Date.now()
},
username: {
  type: String,
  // required: true,
  unique: true
},
googleId: {
  type: String,
},
displayName: {
  type: String,
},
isAdmin: { type: Boolean, default: false }
});

UserSchema.statics.grantAdminAccess = function(id) {
    return this.findByIdAndUpdate(id, { isAdmin: true }).exec();
};
module.exports = mongoose.model('users', UserSchema);