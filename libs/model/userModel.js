const mongoose = require('mongoose');
const userSchema  = require('../schema/userShema');
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;