const uploadServce = require('../service/uploadService');
const common = require('../common/common');

exports.uploadImgAndUpdateGood = (req, res) => {
    const files = req.files;
    const goodId = req.params.id;
    if(!files || !goodId) {
        return common.handleCtrlData({err: common.errorMsg.upload.INVALID_IMAGE_DATA}, res);
    }
    uploadServce.uploadGoodImg(goodId, files).then(good => {
        return common.handleCtrlData(good, res);
    }).catch(err => {
        return common.handleCtrlData(err, res);
    })
};