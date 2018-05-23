const common = require('../common/common');
const userDao = require('../dao/userDao');

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
        return common.handleServiceData(null, token);
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

