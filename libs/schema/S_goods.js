const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const common = require('../common/common');
const GoodsSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    preview: {type: String},
    createTime: {type: Date, default: Date.now},
    updateTime: { type: Date, default: Date.now },
    settings: Schema.Types.Mixed,
    properties: Schema.Types.Mixed
});

GoodsSchema.statics.findPage = common.findPage;

module.exports = GoodsSchema;