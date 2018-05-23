const userService = require('../service/userService');
const common = require('../common/common');

exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password) {
        return common.handleCtrlData({err: '请输入正确的用户名和密码!'}, res);
    }
    userService.register({username,password}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password) {
        return common.handleCtrlData({err: '请输入正确的用户名和密码!'}, res);
    }
    userService.login({username, password}).then(token => {
        return common.handleCtrlData(token, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.modifyPassword = (req, res) => {
    const user = req.user;
    const password = req.body.password;
    if(!user) {
        return common.handleCtrlData({err: '请先登录!'}, res);
    }
    if(!password) {
        return common.handleCtrlData({err: '请输入新密码!'}, res);
    }
    userService.modifyPassword({user, password}).then(newUser => {
        return common.handleCtrlData(newUser, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.verifyToken = (req, res) => {
    const user = req.user;
    if(!user) {
        return common.handleCtrlData({err: '自动登录失败!'}, res);
    }
    userService.verifyToken({userId: user.id}).then(token => {
        return common.handleCtrlData(token, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};
