const goodService = require('../service/goodService');
const common = require('../common/common');

//获取商品
exports.getGoodsList = (req, res) => {
    const params = {limit: req.query.limit, page: req.query.page,};
    goodService.getGoodsList(params).then(data => {
        return common.handleCtrlData(data, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

//修改商品信息
exports.updateGood = (req, res) => {
    const goodId = req.params.goodId;
    if(!goodId) {
        return common.handleCtrlData({err: '商品ID不存在！'}, res);
    }
    const body = {price: req.body.price, name: req.body.name};
    goodService.updateGood(goodId, body).then(good => {
        return common.handleCtrlData(good, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

//创建商品
exports.createGood =  (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    if(!name || !price) {
        return common.handleCtrlData({err: '数据填写不完整'}, res);
    }
    goodService.createGood({name: name, price: price}).then(good => {
        return common.handleCtrlData(good, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

//删除商品
exports.deleteGood =  (req, res) => {
    const goodId = req.params.goodId;
    if(!goodId) {
        return common.handleCtrlData({err: '商品ID不存在！'}, res);
    }
    goodService.deleteGood(goodId).then(good => {
        return common.handleCtrlData(good, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

//加入购物车
exports.addCart = (req, res) => {
    const user = req.user;
    const goodId = req.params.goodId;
    if(!user) {
        return common.handleCtrlData({err: '请先登录！'}, res);
    }
    if(!goodId) {
        return common.handleCtrlData({err: '物品ID不正确！'}, res);
    }
    goodService.addCart({user, goodId}).then(good => {
        return common.handleCtrlData(good, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

//取消购物车
exports.removeCart = (req, res) => {
    const user = req.user;
    const goodId = req.params.goodId;
    if(!user) {
        return common.handleCtrlData({err: '请先登录！'}, res);
    }
    if(!goodId) {
        return common.handleCtrlData({err: '物品ID不正确！'}, res);
    }
    goodService.removeCart({user, goodId}).then(good => {
        return common.handleCtrlData(good, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

//获取购物车
exports.getCart = (req, res) => {
    const user = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    if(!user) {
        return common.handleCtrlData({err: '请先登录！'}, res);
    }
    goodService.getCart({user, limit, page}).then(good => {
        return common.handleCtrlData(good, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
}