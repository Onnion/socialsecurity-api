var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET login listing. */
router.get('/api/validationdevice/:device', db.verifyDevice);

module.exports = router;

