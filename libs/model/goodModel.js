const mongoose = require('mongoose');
const goodsSchema  = require('../schema/goodShema');
const goodsModel = mongoose.model('goods', goodsSchema);
module.exports = goodsModel;