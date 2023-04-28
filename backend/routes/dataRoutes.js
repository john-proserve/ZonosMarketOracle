// Require external modules
const express = require('express');
const dataController = require('../controllers/dataController');

// Create an instance of an Express router
const router = express.Router();

// Mount the parseData route handler at /api/data/parseData
router.route('/').post(dataController.promptData);

// Export the router module
module.exports = router;