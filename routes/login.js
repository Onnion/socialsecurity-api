const express = require('express');
const router = express.Router();
const db = require('../queries');


/* GET login listing. */
router.put('/api/login/:device', db.login);

module.exports = router;
