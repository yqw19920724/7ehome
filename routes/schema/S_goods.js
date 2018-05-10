const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    preview: {type: String, required: true},
    createTime: {type: Date, default: Date.now},
    updateTime: { type: Date, default: Date.now },
    settings: Schema.Types.Mixed,
    properties: Schema.Types.Mixed
});

module.exports = GoodsSchema;