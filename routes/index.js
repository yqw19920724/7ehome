var express = require('express');
var router = express.Router();
var users = require('./users');
var goods = require('./goods');

/* GET home page. */
router.use('/users', users);
router.use('/goods', goods);

module.exports = router;
