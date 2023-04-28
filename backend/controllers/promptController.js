const Prompt = require('../models/Prompt');
const asyncHandler = require('express-async-handler');

// Get All Prompts
const getAllPrompts = asyncHandler(async (req, res) => {
    const prompt = await Prompt.find().lean();
    if(!prompt?.length) {
        return res.status(400).json({ message: 'No prompts found' });
    }
    res.json(prompt);
});

// Get Prompt By ID
const getPromptById = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if(!_id) {
        return res.status(400).json({ message: 'Prompt ID Required' });
    }
    const prompt = await Prompt.findOne({ _id }).lean();
    if(!prompt) {
        return res.status(400).json({ message: 'Prompt not found' });
    }
    res.status(200).json({message: `ID: ${prompt.id} Prompt: ${prompt.text}`});
});


// Create Note
const createNewPrompt = asyncHandler(async (req, res) => {
    const { text } = req.body;
    if(!text) {
        return res.status(400).json({ message: 'All fields are required' });
    };

    const promptObject = { text};

    const newPrompt = await Prompt.create(promptObject);

    if(!newPrompt) {
        return res.status(400).json({ message: 'Invalid Prompt data received.'});
    }
    res.status(201).json({message: `New Prompt ${newPrompt._id} created.`});
});

// Update Note
const updatePrompt = asyncHandler(async (req, res) => {
    const { _id, text } = req.body;

    if(!_id || !text) {
        return res.status(400).json({ message: 'Prompt ID Required' });
    }

    const pastPrompt = await Prompt.findById(_id).exec();

    if(!pastPrompt){
        return res.status(404).json({ message: 'Prompt not found' });
    }

    pastPrompt.text = text;
        
    const updatedPrompt = await pastPrompt.save();
    res.json({message: `Note ${updatedPrompt._id} updated.`});
});

// Delete Note
const deletePrompt = asyncHandler(async (req, res) => {
    const { _id } = req.body;
    if(!_id) {
        return res.status(400).json({ message: 'Prompt ID Required.' });
    }

    const prompt = await Prompt.findById(_id).exec();

    if(!prompt){
        return res.status(400).json({ message: 'Prompt not found' });
    }

    const result = await prompt.deleteOne();
    const reply = `Prompt with ID ${result._id} deleted.`;
    res.json({message: reply});
});

module.exports = {
    getAllPrompts,
    getPromptById,
    createNewPrompt,
    updatePrompt,
    deletePrompt
}