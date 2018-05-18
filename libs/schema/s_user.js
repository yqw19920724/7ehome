const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    settings: Schema.Types.Mixed,
    properties: Schema.Types.Mixed
}, {versionKey: false});

//运用记录数据被创建与被修改的时间的插件
UserSchema.plugin(timestamps);

module.exports = UserSchema;