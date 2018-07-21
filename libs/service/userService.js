const common = require('../common/common');
const userDao = require('../dao/userDao');
const goodDao = require('../dao/goodDao');

exports.register = async params => {
    const [err1, user] = await common.to(userDao.findUserByParams({username: params.username}));
    if(err1) return common.handleServiceData(err1);
    if(user) return common.handleServiceData({err: '该用户名已经被注册了！'});
    const salt = common.randomData(8);
    const password = common.encrypt(`${params.password}${salt}`);
    const [err2, newUser] = await common.to(userDao.createUser({
        username: params.username,
        password,
        salt
    }));
    if(err2) return common.handleServiceData(err2);
    return common.handleServiceData(null, newUser);
};

exports.login = async params => {
    const [err, user] = await common.to(userDao.findUserByParams({username: params.username}));
    if(err) return common.handleServiceData(err);
    if(!user) return common.handleServiceData({err: '该用户名还未注册！'});
    const newPassword = common.encrypt(`${params.password}${user.salt}`);
    if(newPassword === user.password) {
        const token = common.createToken(user._id);
        return common.handleServiceData(null, {token: token.token, message: '登录成功！'});
    }else {
        return common.handleServiceData({err: '密码不正确！'});
    }
};

exports.modifyPassword = async params => {
    const salt = common.randomData(8);
    const password = common.encrypt(`${params.password}${salt}`);
    const user = params.user;
    user.salt = salt;
    user.password = password;
    const [err, newUser] = await common.to(userDao.saveUser(user));
    if(err) return common.handleServiceData(err);
    return common.handleServiceData(null, newUser);
};

exports.verifyToken = async userId => {
    const token = common.createToken(userId);
    return common.handleServiceData(null, token);
};

exports.createAddress = async ({user, site}) => {
    const address = user.address || [];
    address.push({site});
    const [err, newUser] = await common.to(userDao.saveUser(user));
    if(err) return common.handleServiceData(err);
    return common.handleServiceData(null, newUser);
};

exports.getAddress = async ({user, limit, page}) => {
    const address = user.address || [];
    const emptyData = {data: [],limit: limit, page: page, total: 0};
    if(address.length === 0) {
        return common.handleServiceData(null, emptyData)
    }
    const startIndex = limit * (page - 1);
    if(startIndex > address.length - 1) {
        return common.handleServiceData(null, emptyData)
    }
    let endIndex = startIndex + limit - 1;
    if(endIndex > address.length - 1) {
        endIndex = address.length - 1;
    }
    const newAddress = address.slice(startIndex, endIndex + 1);
    return common.handleServiceData(null, newAddress);
};

exports.updateAddress = async ({user, addressId, site, usage}) => {
    const address = user.address || [];
    if(address.length === 0) {
        return common.handleServiceData({err: '地址数据错误！'});
    }
    const index = address.findIndex(item => {
        return item.id === addressId
    });
    if(index === -1) {
        return common.handleServiceData({err: '地址数据错误！'});
    }
    if(site) {
        address[index].site = site
    }
    if(usage) {
        address.forEach(item => {
            item.usage = false;
        });
        address[index].usage = eval(usage)
    }
    const [err, newUser] = await common.to(userDao.saveUser(user));
    if(err) return common.handleServiceData(err);
    return common.handleServiceData(null, newUser);
};

exports.deleteAddress = async ({user, addressId}) => {
    const address = user.address;
    const index = address.findIndex(item => {
        return item.id === addressId
    });
    if(index === -1) {
        return common.handleServiceData({err: '地址数据错误！'});
    }
    address.splice(index, 1);
    const [err, newUser] = await common.to(userDao.saveUser(user));
    if(err) return common.handleServiceData(err);
    return common.handleServiceData(null, newUser);
};

exports.createOrder= async ({user, addressId, goods}) => {
    const promiseList = Array.from({length: goods.length});
    for(let good of goods) {
        if(!good.price) {
            return common.handleServiceData({err: '商品ID错误！'});
        }
        if(!good.num || good.num < 1) {
            return common.handleServiceData({err: '商品数量错误！'});
        }
        promiseList.push(
            new Promise((resolve, reject) => {
                goodDao.findGoodById(good.goodId).then(result => {
                    return resolve(result)
                }).catch(err => reject(err))
            })
        )
    }
    const [err1, goodList] = await Promise.all(promiseList);
    if(err1) return common.handleServiceData(err1);
    const invalidGoods = goodList.filter(_good => {
        return _good === null
    });
    if(invalidGoods.length !== 0) {
        return common.handleServiceData({err: '商品ID错误！'});
    }
    const order = {status: 0, goods, addressId};
    user.order.push(order);
    const [err2, newUser] = await common.to(userDao.saveUser(user));
    if(err2) return common.handleServiceData(err2);
    return common.handleServiceData(null, newUser);
};

exports.updateOrder = async ({user, orderIndex, addressId, goods}) => {
    const promiseList = Array.from({length: goods.length});
    const order = user.order[orderIndex];
    if(order.status === 1) {
        return common.handleServiceData({err: '订单无法修改！'});
    }
    if(goods && goods.length !== 0) {
        for(let good of goods) {
            if(!good.price) {
                return common.handleServiceData({err: '商品ID错误！'});
            }
            if(!good.num || good.num < 1) {
                return common.handleServiceData({err: '商品数量错误！'});
            }
            promiseList.push(
                new Promise((resolve, reject) => {
                    goodDao.findGoodById(good.goodId).then(result => {
                        return resolve(result)
                    }).catch(err => reject(err))
                })
            )
        }
        const [err1, goodList] = await Promise.all(promiseList);
        if(err1) return common.handleServiceData(err1);
        const invalidGoods = goodList.filter(_good => {
            return _good === null
        });
        if(invalidGoods.length !== 0) {
            return common.handleServiceData({err: '商品ID错误！'});
        }
        order.goods = goods
    }
    if(addressId) {
        order.addressId = addressId;
    }
    const [err2, newUser] = await common.to(userDao.saveUser(user));
    if(err2) return common.handleServiceData(err2);
    return common.handleServiceData(null, newUser);
};

exports.deleteOrder = async ({user, orderIndex}) => {
    const order = user.order;
    order.splice(orderIndex, 1);
    const [err, newUser] = await common.to(userDao.saveUser(user));
    if(err) return common.handleServiceData(err);
    return common.handleServiceData(null, newUser);
};

exports.getOrder = async ({user, limit, page}) => {
    const order = user.order || [];
    const emptyData = {data: [],limit: limit, page: page, total: 0};
    if(order.length === 0) {
        return common.handleServiceData(null, emptyData)
    }
    const startIndex = limit * (page - 1);
    if(startIndex > order.length - 1) {
        return common.handleServiceData(null, emptyData)
    }
    let endIndex = startIndex + limit - 1;
    if(endIndex > order.length - 1) {
        endIndex = order.length - 1;
    }
    const newOrder = address.slice(startIndex, endIndex + 1);
    return common.handleServiceData(null, newOrder);
};