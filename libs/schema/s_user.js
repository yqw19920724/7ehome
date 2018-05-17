const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    settings: Schema.Types.Mixed,
    properties: Schema.Types.Mixed
}, {versionKey: false});

module.exports = UserSchema;