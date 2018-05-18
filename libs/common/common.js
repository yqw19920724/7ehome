const crypto = require('crypto');

exports.responseMethod = (res, result) => {
    if(result.err) {
        return res.status(400).json({err: result.err.message});
    }
    return res.status(200).json(result.data);
};

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



