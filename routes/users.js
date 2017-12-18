var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET users listing. */
router.get('/api/users', db.getAllUsers);
router.get('/api/users/:codigo_usuario', db.getSingleUser);
router.get('/api/users/validate/login/:user_deviceJSON', db.verifyLogin);
router.get('/api/users/validate/user/:userJSON', db.verifyUser);
router.put('/api/users/login/:device', db.login);
router.put('/api/users/logout/:device', db.logout);
router.post('/api/users', db.createUser);

module.exports = router;
