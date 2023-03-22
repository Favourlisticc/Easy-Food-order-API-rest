const bcrypt = require('bcryptjs')

//hashing created user password into non-recovering password for user safety
function hashPassword(password){
const salt = bcrypt.genSaltSync()
return bcrypt.hashSync(password, salt)
}

//comparing given login password to the hashedpassword in the database with the given email
function comparePassword(raw, hash) {
 return bcrypt.compareSync(raw, hash)
}
module.exports = {
    hashPassword,
    comparePassword
}