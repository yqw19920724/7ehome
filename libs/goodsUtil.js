const goods = require('./model/m_goods');
const common = require('./common/common');

//获取商品
exports.mw_getGoods = {
    getGoodsList: function (req, res) {
        const params = {
            limit: req.query.limit,
            page: req.query.page,
        };
        goods.findPage(params).then((data) => {
           return res.status(200).json(data)
        }, (err) => {
            return res.status(400).json({err: err.message})
        })
    }
}

//创建商品
exports.mw_creatGood = {
    checkParams: function (req, res, next) {
        if(!req.body.name || !req.body.price) {
            return res.status(400).json({err: 'image is invalid'})
        }
        next()
    },
    create: function (req, res) {
        goods.create({
            name: req.body.name,
            price: req.body.price,
        }, function (err, doc) {
            common.responseMethod(res, {err: err, data: doc});
        })
    }
};

exports.mw_deleteGood = {
    deleteGood: function (req, res) {
        goods.findById(req.params.goodId, (err, good) => {
            if(err) {
                return res.status(400).json({err: err.message})
            }
            good.remove().then((_good) => {
                return res.status(200).json({data: _good})
            }).catch(function (err) {
                return res.status(400).json({err: err.message})
            })
        })
    }
}