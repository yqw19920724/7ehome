const express = require('express');
const router = express.Router();
const userCtrl = require('../libs/controller/userCtrl');
const userMiddleware = require('../libs/middleware/user');

/* GET users listing. */
router.post('/register', userCtrl.register);

router.post('/login', userMiddleware.verifyToken,userCtrl.login);

module.exports = router;
