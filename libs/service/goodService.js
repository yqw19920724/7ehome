const goodDao = require('../dao/goodDao');
const userDao = require('../dao/userDao');
const common = require('../common/common');

exports.getGoodsList = async params => {
    const [err, result] = await common.to(goodDao.getGoodsList(params));
    if(err) return err;
    return result;
};

exports.updateGood = async (goodId, params) => {
    const [err, good] = await common.to(goodDao.findGoodById(goodId));
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
        const [err, _good] = await common.to(goodDao.saveGood(good));
        if(err) return err;
        return _good;
    }else {
        return good
    }
};

exports.createGood = async params => {
    const [err, result] = await common.to(goodDao.createGood(params));
    if(err) return err;
    return result;
};

exports.deleteGood = async goodId => {
    const [err1, good] = await common.to(goodDao.findGoodById(goodId));
    if(err1) return err1;
    const [err2, _good] = await common.to(goodDao.deleteGood(good));
    if(err2) return err2;
    return _good;
};

exports.addCart = async ({user, goodId}) => {
    const [err1, good] = await common.to(goodDao.findGoodById(goodId));
    if(err1) return err1;
    const cartList = user.cart || [];
    const index = cartList.findIndex( item => {
        return item.goodId === goodId
    });
    if(index === -1) {
        cartList.push({goodId: goodId, num: 1})
    }else {
        cartList[index].num++;
    }
    const [err2, newUser] = await common.to(userDao.saveUser(user));
    if(err2) return err2;
    return good;
};

exports.removeCart = async ({user, goodId}) => {
    const [err, good] = await common.to(goodDao.findGoodById(goodId));
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
        }
        const [err, newUser] = await common.to(userDao.saveUser(user));
        if(err) return err;
        return _good;
    }
}
