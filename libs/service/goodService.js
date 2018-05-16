const goodDao = require('../dao/goodDao');

exports.getGoodsList = params => {
    return new Promise((resolve, reject) => {
        goodDao.getGoodsList(params).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
};

exports.updateGood = async (goodId, params) => {
    try{
        const good = await goodDao.findGoodById(goodId);
        let beChanged;
        if(params.price) {
            good.price = parseInt(req.body.price);
            beChanged = true;
        }
        if(params.name) {
            good.name = params.name;
            beChanged = true;
        }
        if(beChanged) {
            return await goodDao.saveGood(good)
        }else {
            return good
        }
    }catch (err) {
        return err
    }
};

exports.createGood = params => {
    return new Promise((resolve, reject) => {
        goodDao.createGood(params).then(good => {
            return resolve(good)
        }).catch(err => {
            return reject(err)
        })
    })
};

exports.deleteGood = async goodId => {
    try {
        const good = await goodDao.findGoodById(goodId);
        const _good = await goodDao.deleteGood(good);
        return _good;
    }catch (err) {
        return err;
    }
};