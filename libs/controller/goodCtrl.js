const goodService = require('../service/goodService');

//获取商品
exports.mw_getGoods = {
    getGoodsList: (req, res) => {
        const params = {limit: req.query.limit, page: req.query.page,};
        goodService.getGoodsList(params).then(data => {
            return res.status(200).json(data)
        }).catch(err => {
            return res.status(400).json({err: err.message})
        })
    }
};

//修改商品信息
exports.mw_updateGood = {
    updateGood: (req, res) => {
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
    }
}

//创建商品
exports.mw_creatGood = {
    create: (req, res) => {
        const name = req.body.name;
        const price = req.body.price;
        if(!name || !price) {
            return res.status(400).json({err: '数据填写不完整'})
        }
        goodService.createGood({name: name, price: price}).then(good => {
            return res.status(200).json({data: good})
        }).catch(err => {
            return res.status(400).json({err: err.message})
        })
    }
};

//删除商品
exports.mw_deleteGood = {
    deleteGood: (req, res) => {
        const goodId = req.params.goodId;
        if(!goodId) {
            return res.status(400).json({err: '商品ID不存在！'})
        }
        goodService.deleteGood(goodId).then(good => {
            return res.status(200).json({data: good})
        }).catch(err => {
            return res.status(400).json({err: err.message})
        })
    }
}