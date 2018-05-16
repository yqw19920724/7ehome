const express = require('express');
const router = express.Router();
const goods = require('../libs/model/m_goods');
const goodCtrl = require('../libs/controller/goodCtrl');

//获取goods列表
router.get('/', goodCtrl.mw_getGoods.getGoodsList);

//修改good数据
router.put('/:goodId',
    goodCtrl.mw_updateGood.updateGood);

//创建good
router.post('/',
    goodCtrl.mw_creatGood.create);

//删除good
router.delete('/:goodId',
    goodCtrl.mw_deleteGood.deleteGood)

module.exports = router;