const express = require('express');
const router = express.Router();
const goods = require('../libs/model/M_goods');
const goodsUtil = require('../libs/goodsUtil');

//获取goods列表
router.get('/', goodsUtil.MW_getGoods.getGoodsList);

router.put('/', function(req, res, next) {
    goods.find({}, function (err, doc) {
        console.log(doc);
        res.render('index', { title: doc });
    })
});

//创建good
router.post('/',
    goodsUtil.MW_creatGood.checkParams,
    goodsUtil.MW_creatGood.create);

module.exports = router;