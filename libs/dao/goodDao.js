const goods = require('../model/goodModel');

//获取商品列表
exports.getGoodsList =  params => {
    return new Promise((resolve, reject) => {
        goods.findPage(params).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err)
        })
    })
};

//ID查询商品
exports.findGoodById = goodId => {
    return new Promise((resolve, reject) => {
        goods.findById(goodId, (err, good) => {
            if(err) {
                return reject(err)
            }
            return resolve(good)
        })
    })
};

//保存商品信息
exports.saveGood = good => {
    return new Promise((resolve, reject) => {
        good.save().then((_good) => {
            return resolve(_good)
        }).catch((err) => {
            return reject(err)
        })
    })
};

exports.createGood = params => {
    return new Promise((resolve, reject) => {
        goods.create(params, function (err, doc) {
            if(err) {
                return reject(err)
            }
            return resolve(doc)
        })
    })
};

exports.deleteGood = good => {
    return new Promise((resolve, reject) => {
        good.remove().then(_good => {
            return resolve(_good)
        }).catch(function (err) {
            return reject(err)
        })
    })
}