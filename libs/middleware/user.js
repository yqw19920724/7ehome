const common = require('../common/common');
const userDao = require('../dao/userDao');

exports.verifyToken = (req, res, next) => {
    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['access-token'];
    if(!token) return next();
    const data = common.decodeToken(token);
    if (data.exp <= Date.now()) {
        return res.status(400).json({err: 'Access token has expired'});
    }
    userDao.findUserById(data.iss).then(user => {
        req.user = user;
        return next();
    }).catch(err => {
        return res.status(400).json({err: err.message});
    })

};