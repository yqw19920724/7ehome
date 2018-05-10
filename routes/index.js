var express = require('express');
var router = express.Router();
var users = require('./libs/users')

/* GET home page. */
router.use('/users', users);

module.exports = router;
