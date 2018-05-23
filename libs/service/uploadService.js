const goodService = require('./goodService');
const common = require('../common/common');
const oss = require('../../oss');
const ossPath = 'images/goods/';

exports.uploadGoodImg = async (goodId, files) => {
    const path = `${ossPath}${goodId}.jpg`;
    const [err1, result] = await common.to(oss.uploadFile(path, files.img.path));
    if(err1) return common.handleServiceData(err1);
    const [err2, good] = await common.to(goodService.updateGood(goodId, {preview: result.url}));
    if(err2) return common.handleServiceData(err2);
    return good;
}