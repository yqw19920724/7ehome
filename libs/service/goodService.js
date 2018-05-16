const goodDao = require('../dao/goodDao');

exports.getGoodsList = async params => {
    try {
        return await goodDao.getGoodsList(params)
    }catch (err) {
        return err
    }
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
        if(params.preview) {
            good.preview = params.preview;
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

exports.createGood = async params => {
    try {
        return await goodDao.createGood(params)
    }catch (err) {
        return err
    }
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