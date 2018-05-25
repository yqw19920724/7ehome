const express = require('express');
const router = express.Router();
const userCtrl = require('../libs/controller/userCtrl');
const userMiddleware = require('../libs/middleware/user');

//注册账号
router.post('/register', userCtrl.register);

//登录
router.post('/login', userMiddleware.verifyToken, userCtrl.login);

//修改密码
router.post('/modifyPassword', userMiddleware.verifyToken, userCtrl.modifyPassword);

//自动登录验证
router.post('/verifyToken', userMiddleware.verifyToken, userCtrl.verifyToken);

//添加地址
router.post('/createAddress', userMiddleware.verifyToken, userCtrl.createAddress);

//修改地址
router.put('/updateAddress/:addressId', userMiddleware.verifyToken, userCtrl.updateAddress);

//删除地址
router.delete('/deleteAddress/:addressId', userMiddleware.verifyToken, userCtrl.deleteAddress);

//创建订单
router.post('/createOrder', userMiddleware.verifyToken, userCtrl.createOrder);

//修改订单
router.put('/updateOrder/:orderId', userMiddleware.verifyToken, userCtrl.updateOrder);

//删除订单
router.delete('/deleteOrder/:orderId', userMiddleware.verifyToken, userCtrl.deleteOrder);

module.exports = router;
