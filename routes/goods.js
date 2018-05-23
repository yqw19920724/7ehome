const express = require('express');
const router = express.Router();
const goodCtrl = require('../libs/controller/goodCtrl');
const userMiddleware = require('../libs/middleware/user');

//获取goods列表
router.get('/', goodCtrl.getGoodsList);

//修改good数据
router.put('/:goodId', goodCtrl.updateGood);

//创建good
router.post('/', goodCtrl.createGood);

//删除good
router.delete('/:goodId', goodCtrl.deleteGood);

//加入购物车
router.post('/addCart/:goodId', userMiddleware.verifyToken, goodCtrl.addCart);

//取消购物车
router.post('/removeCart/:goodId', userMiddleware.verifyToken, goodCtrl.removeCart);

//获取购物车
router.get('/getCart', userMiddleware.verifyToken, goodCtrl.getCart);

module.exports = router;