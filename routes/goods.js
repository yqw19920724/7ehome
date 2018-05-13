const express = require('express');
const router = express.Router();
const goods = require('../libs/model/M_goods');
const goodsUtil = require('../libs/goodsUtil');

/* GET users listing. */
router.get('/', function(req, res, next) {
    goods.find({}, function (err, doc) {
        console.log(doc);
        res.render('index', { title: doc });
    })
});

router.put('/', function(req, res, next) {
    goods.find({}, function (err, doc) {
        console.log(doc);
        res.render('index', { title: doc });
    })
});

router.post('/',
    goodsUtil.MW_creatGood.checkParams,
    goodsUtil.MW_creatGood.create);

module.exports = router;