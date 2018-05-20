const common = require('../common/common');
const userDao = require('../dao/userDao');

exports.register = async params => {
    [err, user] = await common.to(userDao.findUserByParams({username: params.username}));
    if(err) return err;
    if(user) return {err: '该用户名已经被注册了！'};
    const salt = common.randomData(8);
    const password = common.encrypt(`${params.password}${salt}`);
    [err, newUser] = await common.to(userDao.createUser({
        username: params.username,
        password,
        salt
    }));
    if(err) return err;
    return newUser;
};

exports.login = async params => {
    [err, user] = await common.to(userDao.findUserByParams({username: params.username}));
    if(err) return err;
    if(!user) return {err: '该用户名还未注册！'};
    const newPassword = common.encrypt(`${params.password}${user.salt}`);
    if(newPassword === user.password) {
        const token = common.createToken(user._id);
        return token;
    }else {
        return {err: '密码不正确！'};
    }
};

exports.modifyPassword = async params => {
    const salt = common.randomData(8);
    const password = common.encrypt(`${params.password}${salt}`);
    const user = params.user;
    user.salt = salt;
    user.password = password;
    [err, newUser] = await common.to(userDao.saveUser(user));
    if(err) return err;
    return newUser;
};

exports.verifyToken = async userId => {
    return common.createToken(userId);
}

