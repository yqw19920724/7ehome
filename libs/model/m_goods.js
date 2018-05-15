const mongoose = require('mongoose');
const goodsSchema  = require('../schema/s_goods');
const goodsModel = mongoose.model('goods', goodsSchema);
module.exports = goodsModel;