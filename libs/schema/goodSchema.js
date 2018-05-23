const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const findPage = require('../common/findpage');
const GoodsSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    preview: {type: String},
    settings: Schema.Types.Mixed,
    properties: Schema.Types.Mixed
}, {versionKey: false});

//引入自定义分页方法
GoodsSchema.statics.findPage = findPage;

//运用记录数据被创建与被修改的时间的插件
GoodsSchema.plugin(timestamps);

module.exports = GoodsSchema;