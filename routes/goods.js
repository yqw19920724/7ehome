const express = require('express');
const router = express.Router();
const goodCtrl = require('../libs/controller/goodCtrl');

//获取goods列表
router.get('/', goodCtrl.getGoodsList);

//修改good数据
router.put('/:goodId', goodCtrl.updateGood);

//创建good
router.post('/', goodCtrl.createGood);

//删除good
router.delete('/:goodId', goodCtrl.deleteGood);

module.exports = router;