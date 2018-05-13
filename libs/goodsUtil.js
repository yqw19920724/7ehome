const goods = require('./model/M_goods');
const common = require('./common/common');

exports.MW_creatGood = {
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
}