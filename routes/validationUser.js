var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET login listing. */
router.get('/api/validationuser/:user', db.verifyUser);

module.exports = router;

