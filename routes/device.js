var express = require('express');
var router = express.Router();

var db = require('../queries');


/* GET login listing. */
router.get('/api/device/validate/:device', db.verifyDevice);
router.post('/api/device', db.createDevice);

module.exports = router;

