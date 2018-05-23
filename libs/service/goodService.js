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
};

exports.getCart = async ({user, limit, page}) => {
    const cart = user.cart || [];
    const emptyData = {data: [],limit: limit, page: page, total: 0};
    if(cart.length === 0) {
        return emptyData
    }
    const startIndex = limit * (page - 1);
    if(startIndex > cart.length - 1) {
        return emptyData
    }
    let endIndex = startIndex + limit - 1;
    if(endIndex > cart.length - 1) {
        endIndex = cart.length - 1;
    }
    const newCart = cart.slice(startIndex, endIndex + 1);

    let promiseList = Array.from({length: newCart.length});
    newCart.forEach((item, index) => {
        promiseList[index] = new Promise((resolve, reject) => {
            goodDao.findGoodById(item.goodId).then(good => {
                good.num = item.num;
                resolve(good)
            }).catch(err => {
                reject(err)
            })
        });
    });
    return Promise.all(promiseList).then(list => {
        return {
            data: list,
            limit: limit,
            page: page,
            total: list.length
        }
    }).catch(err => {
        return err;
    })
};


