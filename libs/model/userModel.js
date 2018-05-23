const mongoose = require('mongoose');
const userSchema  = require('../schema/userSchema');
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;