const express = require('express');
const router = express.Router();
const users = require('./users');
const goods = require('./goods');
const upload = require('./upload');

/* GET home page. */
router.use('/users', users);
router.use('/goods', goods);
router.use('/upload', upload);

module.exports = router;
