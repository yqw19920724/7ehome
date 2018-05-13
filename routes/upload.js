const express = require('express');
const router = express.Router();
const uploadUtil = require('../libs/uploadUtil');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/:id',
    multipartMiddleware,
    uploadUtil.MW_creatGood.checkParams,
    uploadUtil.MW_creatGood.uploadToOss,
    uploadUtil.MW_creatGood.updateGood);

module.exports = router;