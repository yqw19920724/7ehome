const common = require('../common/common');
const userDao = require('../dao/userDao');

exports.register = async params => {
        [err, user] = await common.to(userDao.findUserByParams({username: params.username}));
        if(err) return err;
        if(user) return {err: '该用户名已经被注册了！'}
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

