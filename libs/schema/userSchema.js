const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const cartSchema = new Schema({goodId: String, num: Number, time: {type: Date, default: Date.now}},{ _id: false, id: true});
const addressSchema = new Schema({site: String, usage: {type: Boolean, default: false}});

const goodsInOrderSchema = new Schema({goodId: String, num: Number, price: Number});
const orderSchema = new Schema({status: Number, goods: [goodsInOrderSchema], addressId: String});

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    cart: [cartSchema],
    address: [addressSchema],
    order: [orderSchema],
    settings: Schema.Types.Mixed,
    properties: Schema.Types.Mixed
}, {versionKey: false});

//运用记录数据被创建与被修改的时间的插件
userSchema.plugin(timestamps);
orderSchema.plugin(timestamps);

module.exports = userSchema;