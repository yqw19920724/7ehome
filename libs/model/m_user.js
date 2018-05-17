const mongoose = require('mongoose');
const userSchema  = require('../schema/s_user');
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;