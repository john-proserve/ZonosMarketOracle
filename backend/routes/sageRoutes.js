const express = require('express')
const router = express.Router()
const sageController = require('../controllers/sageController')

router.route('/')
    .post(sageController.sagePrompt);

module.exports = router