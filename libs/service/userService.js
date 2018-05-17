const common = require('../common/common');
const userDao = require('../dao/userDao');

exports.register = async params => {
    try {
        const user = await userDao.findUserByParams({username: params.username});
        if(user) {
            throw {message: '该用户名已经被注册了！'}
        }
        const salt = common.randomData(8);
        const password = common.encrypt(`${params.password}${salt}`);
        const newUser = await userDao.createUser({
            username: params.username,
            password,
            salt
        });
        return newUser;
    } catch (err) {
        return err
    }
};

