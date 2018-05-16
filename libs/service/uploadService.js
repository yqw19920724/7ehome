const goodService = require('./goodService');
const oss = require('../../oss');
const ossPath = 'images/goods/';

exports.uploadGoodImg = async (goodId, files) => {
    try {
        const path = `${ossPath}${goodId}.jpg`;
        const result = await oss.uploadFile(path, files.img.path);
        const good = goodService.updateGood(goodId, {preview: result.url});
        return good;
    } catch (err) {
        return err;
    }
}