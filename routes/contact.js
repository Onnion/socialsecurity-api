var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET contact listing. */
router.get('/api/contact/:cod_usuario', db.getContact);
router.post('/api/contact', db.createContact);
router.put('/api/contact/update/:cod_usuario', db.updateContact);

module.exports = router;