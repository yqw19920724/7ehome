var mongoose = require('mongoose');

exports.connect = function () {
    mongoose.connect('mongodb://localhost:27017/eyun');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("we're connected!")
    });
};