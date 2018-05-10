var express = require('express');
var router = express.Router();
var Goods = require('./model/M_goods');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Goods.find({}, function (err, doc) {
        console.log(doc);
        res.render('index', { title: doc });
    })
});

router.put('/', function(req, res, next) {
    Goods.find({}, function (err, doc) {
        console.log(doc);
        res.render('index', { title: doc });
    })
});

module.exports = router;