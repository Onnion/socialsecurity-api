var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET login listing. */
router.get('/api/validate/device/:device', db.verifyDevice);

module.exports = router;

