const express = require('express');
const router = express.Router();
const db = require('../queries');


/* GET login listing. */
router.put('/api/logout/:device', db.logout);

module.exports = router;
