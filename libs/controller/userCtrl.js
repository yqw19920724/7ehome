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
}