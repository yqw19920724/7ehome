const mongoose = require('mongoose');
const goodsSchema  = require('../schema/S_goods');
const goodsModel = mongoose.model('goods', goodsSchema);
module.exports = goodsModel;