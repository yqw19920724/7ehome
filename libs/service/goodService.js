const goodDao = require('../dao/goodDao');
const common = require('../common/common');

exports.getGoodsList = async params => {
    [err, result] = await common.to(goodDao.getGoodsList(params));
    if(err) return err;
    return result;
};

exports.updateGood = async (goodId, params) => {
    [err, good] = await common.to(goodDao.findGoodById(goodId));
    if(err) return err;
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
        [err, _good] = await common.to(goodDao.saveGood(good));
        if(err) return err;
        return _good;
    }else {
        return good
    }
};

exports.createGood = async params => {
    [err, result] = await common.to(goodDao.createGood(params));
    if(err) return err;
    return result;
};

exports.deleteGood = async goodId => {
    [err, good] = await common.to(goodDao.findGoodById(goodId));
    if(err) return err;
    [err, _good] = await common.to(goodDao.deleteGood(good));
    if(err) return err;
    return _good;
};