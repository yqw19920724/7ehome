const express = require('express');
const router = express.Router();
const uploadCtrl = require('../libs/controller/uploadCtrl');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/:id',
    multipartMiddleware,
    uploadCtrl.uploadImgAndUpdateGood);

module.exports = router;