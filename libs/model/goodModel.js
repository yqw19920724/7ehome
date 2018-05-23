const mongoose = require('mongoose');
const goodsSchema  = require('../schema/goodSchema');
const goodsModel = mongoose.model('goods', goodsSchema);
module.exports = goodsModel;