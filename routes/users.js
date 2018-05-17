const express = require('express');
const router = express.Router();
const userCtrl = require('../libs/controller/userCtrl');

/* GET users listing. */
router.post('/', userCtrl.register);

module.exports = router;
