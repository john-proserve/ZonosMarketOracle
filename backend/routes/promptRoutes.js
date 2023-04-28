const express = require('express')
const router = express.Router()
const promptController = require('../controllers/promptController')

router.route('/')
    .get(promptController.getAllPrompts)
    .post(promptController.createNewPrompt)
    .patch(promptController.updatePrompt)
    .delete(promptController.deletePrompt);

router.route('/:_id')
    .get(promptController.getPromptById);


module.exports = router