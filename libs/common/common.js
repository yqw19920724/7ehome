const crypto = require('crypto');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const errorMsg = require('./errorMsg')

exports.handleServiceData = (err, result) => {
    if(err) {
        return {status: 0, err: err.err}
    }
    return {status: 1, result: result}
};

exports.handleCtrlData = (params, res) => {
    if(params.status === 0) {
        return res.status(400).json(params)
    }else if(params.status === 1) {
        return res.status(200).json(params.result)
    }
    if(!params.status) {
        return res.status(400).json(params)
    }
}

//生成随机数
exports.randomData = (number) => {
    const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const list = Array.from({length: number});
    const length = data.length;
    let str = '';
    list.forEach(() => {
        const random = Math.floor(Math.random()*length);
        str += data[random]
    });
    return str;
};

//加密
exports.encrypt = (data) => {
    return crypto.createHash('md5').update(data, 'utf-8').digest('hex');
};

//封装try catch
exports.to = (promise) => {
    return promise.then(data => {
        return [null, data];
    }).catch(err => [err]);
};

//获取token
exports.createToken = (data) => {
    const expires = moment().add('days', 7).valueOf();
    const token = jwt.encode({
        iss: data,
        exp: expires
    }, config.jwtTokenSecret);
    return {token: token};
}

//解密token
exports.decodeToken = (token) => {
    return jwt.decode(token, config.jwtTokenSecret);
};

exports.errorMsg = errorMsg;



