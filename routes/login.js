var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET login listing. */
router.get('/api/login/:paramsUser', db.verifyLogin);

module.exports = router;
