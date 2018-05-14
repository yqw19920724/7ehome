const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findPage = require('../common/findpage');
const GoodsSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    preview: {type: String},
    createTime: {type: Date, default: Date.now},
    updateTime: { type: Date, default: Date.now },
    settings: Schema.Types.Mixed,
    properties: Schema.Types.Mixed
}, {versionKey: false});

//引入自定义分页方法
GoodsSchema.statics.findPage = findPage;

module.exports = GoodsSchema;