var mongoose = require('mongoose');

exports.connect = function () {
    mongoose.connect('mongodb://localhost:27017/eyun');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '数据库连接失败!'));
    db.once('open', function() {
        console.log("数据库连接成功!")
    });
};