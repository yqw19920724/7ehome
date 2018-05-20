const userService = require('../service/userService');

exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password) {
        return res.status(400).json({err: '请输入正确的用户名和密码!'})
    }
    userService.register({username,password}).then(user => {
        return res.status(200).json(user)
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password) {
        return res.status(400).json({err: '请输入正确的用户名和密码!'})
    }
    userService.login({username, password}).then(token => {
        return res.status(200).json({
            token: token
        })
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

exports.modifyPassword = (req, res) => {
    const user = req.user;
    const password = req.body.password;
    if(!user) {
        return res.status(400).json({err: '请先登录!'})
    }
    if(!password) {
        return res.status(400).json({err: '请输入新密码!'})
    }
    userService.modifyPassword({user, password}).then(newUser => {
        return res.status(200).json(newUser)
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
};

exports.verifyToken = (req, res) => {
    const user = req.user;
    if(!user) {
        return res.status(400).json({err: '自动登录失败!'})
    }
    userService.verifyToken({userId: user.id}).then(token => {
        return res.status(200).json({
            token: token
        })
    }).catch(err => {
        return res.status(400).json({err: err.message})
    })
}
