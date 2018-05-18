const goodService = require('./goodService');
const common = require('../common/common');
const oss = require('../../oss');
const ossPath = 'images/goods/';

exports.uploadGoodImg = async (goodId, files) => {
    const path = `${ossPath}${goodId}.jpg`;
    [err, result] = await common.to(oss.uploadFile(path, files.img.path));
    if(err) return err;
    [err, good] = await common.to(goodService.updateGood(goodId, {preview: result.url}));
    if(err) return err;
    return good;
}