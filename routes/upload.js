const express = require('express');
const router = express.Router();
const uploadUtil = require('../libs/uploadUtil');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/:id',
    multipartMiddleware,
    uploadUtil.mw_creatGood.checkParams,
    uploadUtil.mw_creatGood.uploadToOss,
    uploadUtil.mw_creatGood.updateGood);

module.exports = router;