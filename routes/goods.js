const express = require('express');
const router = express.Router();
const goods = require('../libs/model/m_goods');
const goodsUtil = require('../libs/goodsUtil');

//获取goods列表
router.get('/', goodsUtil.mw_getGoods.getGoodsList);

//修改good数据
router.put('/:goodId',
    goodsUtil.mw_updateGood.updateGood);

//创建good
router.post('/',
    goodsUtil.mw_creatGood.checkParams,
    goodsUtil.mw_creatGood.create);

//删除good
router.delete('/:goodId',
    goodsUtil.mw_deleteGood.deleteGood)

module.exports = router;