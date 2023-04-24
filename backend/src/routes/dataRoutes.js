const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.post('/parseData', dataController.parseData);

module.exports = router;
