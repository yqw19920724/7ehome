const goodService = require('../service/goodService');

//获取商品
exports.getGoodsList = (req, res) => {
    const params = {limit: req.query.limit, page: req.query.page,};
    goodService.getGoodsList(params).then(data => {
        return res.status(200).json(data)
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

//修改商品信息
exports.updateGood = (req, res) => {
    const goodId = req.params.goodId;
    if(!goodId) {
        return res.status(400).json({err: '商品ID不存在！'})
    }
    const body = {price: req.body.price, name: req.body.name};
    goodService.updateGood(goodId, body).then(good => {
        return res.status(200).json({data: good})
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

//创建商品
exports.createGood =  (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    if(!name || !price) {
        return res.status(400).json({err: '数据填写不完整'})
    }
    goodService.createGood({name: name, price: price}).then(good => {
        return res.status(200).json(good)
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

//删除商品
exports.deleteGood =  (req, res) => {
    const goodId = req.params.goodId;
    if(!goodId) {
        return res.status(400).json({err: '商品ID不存在！'})
    }
    goodService.deleteGood(goodId).then(good => {
        return res.status(200).json({data: good})
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

//加入购物车
exports.addCart = (req, res) => {
    const user = req.user;
    const goodId = req.params.goodId;
    if(!user) {
        return res.status(400).json({err: '请先登录！'})
    }
    if(!goodId) {
        return res.status(400).json({err: '物品ID不正确！'})
    }
    goodService.addCart({user, goodId}).then(good => {
        return res.status(200).json({data: good})
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

//取消购物车
exports.removeCart = (req, res) => {
    const user = req.user;
    const goodId = req.params.goodId;
    if(!user) {
        return res.status(400).json({err: '请先登录！'})
    }
    if(!goodId) {
        return res.status(400).json({err: '物品ID不正确！'})
    }
    goodService.removeCart({user, goodId}).then(good => {
        return res.status(200).json({data: good})
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

//获取购物车
exports.getCart = (req, res) => {
    const user = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    if(!user) {
        return res.status(400).json({err: '请先登录！'})
    }
    goodService.getCart({user, limit, page}).then(good => {
        return res.status(200).json(good)
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
}