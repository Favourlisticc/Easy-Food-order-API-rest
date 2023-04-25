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
    required: () => {
      return this.provider !== 'email' ? false : true;
    },
    unique: true
  },
  password: {
    type: String,
  },

  createdAt: {
    type: Date,
   default: new Date()
},
username: {
  type: String,
  required: true,
  unique: true
},
googleId: {
  type: String,
},
displayName: {
  type: String,
},
image: {
  type: String
},
isAdmin: { type: Boolean, default: false }
});

UserSchema.statics.grantAdminAccess = function(id) {
  try{
    return this.findByIdAndUpdate(id, { isAdmin: true }).exec();
  }
  catch(err){
    console.log('NO admin')
  }
};
module.exports = mongoose.model('Users', UserSchema);