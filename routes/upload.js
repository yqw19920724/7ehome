const express = require('express');
const router = express.Router();
const uploadCtrl = require('../libs/controller/uploadCtrl');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/:id',
    multipartMiddleware,
    uploadCtrl.mw_creatGood.checkParams,
    uploadCtrl.mw_creatGood.uploadToOss,
    uploadCtrl.mw_creatGood.updateGood);

module.exports = router;