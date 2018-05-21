const goodDao = require('../dao/goodDao');
const userDao = require('../dao/userDao');
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

exports.addCart = async ({user, goodId}) => {
    [err, good] = await common.to(goodDao.findGoodById(goodId));
    if(err) return err;
    const cartList = user.cart || [];
    const index = cartList.findIndex( item => {
        return item.goodId === goodId
    });
    if(index === -1) {
        cartList.push({goodId: goodId, num: 1})
    }else {
        cartList[index].num++;
    }
    [err, newUser] = await common.to(userDao.saveUser(user));
    if(err) return err;
    return good;
};

exports.removeCart = async ({user, goodId}) => {
    [err, good] = await common.to(goodDao.findGoodById(goodId));
    if(err) return err;
    let cartList = user.cart;
    if(!cartList || cartList.length === 0) {
        cartList = [];
        return good
    }
    const index = cartList.findIndex( item => {
        return item.goodId === goodId
    });
    if(index === -1) {
        return good
    }else {
        const _good = cartList[index];
        _good.num--;
        if(_good.num < 1) {
            cartList.splice(index, 1);
            [err, newUser] = await common.to(userDao.saveUser(user));
            if(err) return err;
            return good;
        }
        return good;
    }
}
