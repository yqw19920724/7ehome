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

exports.createAddress = (req, res) => {
    const user = req.user;
    const site = req.body.site;
    if(!user) {
        return common.handleCtrlData({err: '请先登录!'}, res);
    }
    if(!site) {
        return common.handleCtrlData({err: '请输入地址!'}, res);
    }
    userService.createAddress({user, site}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.updateAddress = (req, res) => {
    const user = req.user;
    const addressId = req.params.addressId;
    const site = req.body.site;
    const usage = req.body.usage;
    if(!user) {
        return common.handleCtrlData({err: '请先登录!'}, res);
    }
    if(!addressId) {
        return common.handleCtrlData({err: '请输入地址ID!'}, res);
    }
    if(!site && !usage) {
        return common.handleCtrlData({status: 1, result: user}, res);
    }
    userService.updateAddress({user, addressId, site, usage}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.deleteAddress = (req, res) => {
    const user = req.user;
    const addressId = req.params.addressId;
    if(!user) {
        return common.handleCtrlData({err: '请先登录!'}, res);
    }
    if(!user.address || user.address.length === 0) {
        return common.handleCtrlData({err: '地址数据错误!'}, res);
    }
    if(!addressId) {
        return common.handleCtrlData({err: '请输入地址ID!'}, res);
    }
    userService.deleteAddress({user, addressId}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
}
