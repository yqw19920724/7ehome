const userService = require('../service/userService');
const common = require('../common/common');

exports.register = (req, res) => {
    const username = req.body.username;
    const firstPassword = req.body.firstPassword;
    const secondPassword = req.body.secondPassword;
    if(!username) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_username}, res);
    }
    if(!firstPassword || !secondPassword) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_password}, res);
    }
    if(firstPassword !== secondPassword) {
        return common.handleCtrlData({err: common.errorMsg.user.twice_passwords_different}, res);
    }
    const password = firstPassword;
    userService.register({ username, password }).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_username}, res);
    }
    if(!password) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_password}, res);
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
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    if(!password) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_new_password}, res);
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
        return common.handleCtrlData({err: common.errorMsg.user.auto_login_failed}, res);
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
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    if(!site) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_address}, res);
    }
    userService.createAddress({user, site}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.getAddress = (req, res) => {
    const user = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    if(!user) {
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    userService.getAddress({user, limit, page}).then(address => {
        return common.handleCtrlData(address, res);
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
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    if(!addressId) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_address_ID}, res);
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
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    if(!user.address || user.address.length === 0) {
        return common.handleCtrlData({err: common.errorMsg.user.addres_error}, res);
    }
    if(!addressId) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_address_ID}, res);
    }
    userService.deleteAddress({user, addressId}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.createOrder = (req, res) => {
    const user = req.user;
    const {addressId, goods} = req.body;
    if(!user) {
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    if(!addressId) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_address_ID}, res);
    }
    const address = user.address || [];
    if(!address || address.length === 0) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_address}, res);
    }
    const addressIndex = user.address.findIndex( item => {
        return item.id === addressIndex
    });
    if(addressIndex === -1) {
        return common.handleCtrlData({err: common.errorMsg.user.invalid_address_ID}, res);
    }
    if(!goods || goods.length === 0) {
        return common.handleCtrlData({err: common.errorMsg.user.please_add_good}, res);
    }
    userService.createOrder({user, addressId, goods}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.updateOrder = (req, res) => {
    const user = req.user;
    const orderId = req.params.orderId;
    if(!user) {
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    if(!orderId) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_order_ID}, res);
    }
    const orders = user.order | [];
    const orderIndex = orders.findIndex(order => {
        return order.id === orderId;
    });
    if(orderIndex === -1) {
        return common.handleCtrlData({err: common.errorMsg.user.invalid_order_ID}, res);
    }
    const addressId = req.body.addressId;
    const goods = req.body.goods;
    userService.updateOrder({user, orderIndex, addressId, goods}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.deleteOrder = (req, res) => {
    const user = req.user;
    const orderId = req.params.orderId;
    if(!user) {
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    if(!orderId) {
        return common.handleCtrlData({err: common.errorMsg.user.please_input_address_ID}, res);
    }
    const orders = user.order | [];
    const orderIndex = orders.findIndex(order => {
        return order.id === orderId;
    });
    if(orderIndex === -1) {
        return common.handleCtrlData({err: common.errorMsg.user.invalid_order_ID}, res);
    }
    userService.deleteOrder({user, orderIndex}).then(user => {
        return common.handleCtrlData(user, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};

exports.getOrder = (req, res) => {
    const user = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    if(!user) {
        return common.handleCtrlData({err: common.errorMsg.user.please_login}, res);
    }
    userService.getOrder({user, limit, page}).then(order => {
        return common.handleCtrlData(order, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
}
