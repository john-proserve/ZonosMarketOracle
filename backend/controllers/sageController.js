const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI });
const openai = new OpenAIApi(configuration);
const fs = require('fs');
const path = require('path');
const { promptInternal } = require('../controllers/dataController');

const sagePrompt = async (req, res) => {
    const { storeName, backgroundInfo, freeformNotes, filename } = req.body;
    if(!storeName || !backgroundInfo || !freeformNotes || !filename) {
        return res.status(400).send('Fields missing from request.');
    }

    // Get the filepath for the systemPrompt.txt
    const systemPath = path.join(__dirname, `../config/systemPrompt.txt`);
    // Read the file and extract the text
    const systemText = fs.readFileSync(systemPath, 'utf8');
    // Add todays date to the end of the text
    let systemPrompt = systemText.trim() + '\n\n' + `Today's date is: ${new Date()}.`;

    // First portion of the userMessage
    const userMessageStart = `\n\nNotes from salesperson:\n${freeformNotes}\n\nStore background:\n${storeName} ${backgroundInfo}\n\n`;

    // Get the filepath to the csv file
    const csvPath = path.join(__dirname, `../uploads/${filename}`);
    // Read the file and extract the text
    const csvData = fs.readFileSync(csvPath, 'utf8');

    // Get the filepath to the formatPrompt.txt
    const formatPath = path.join(__dirname, `../config/formatPrompt.txt`);
    // Read the file and extract the text
    const formatDataPrompt = fs.readFileSync(formatPath, 'utf8');
    // Add the csvData to the end of the formatText
    const formatPrompt = formatDataPrompt + '\n\n' + csvData;
    let csvDataFormatted = '';
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: formatPrompt
                }
            ]
        });
        const completion = response.data.choices[0].message.content;
        const csvDataFormatted = completion;
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

    const userMessage = userMessageStart + csvDataFormatted;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        });
        const completion = response.data.choices[0].message.content;
        return res.status(200).json({
            success: true,
            message: completion,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    sagePrompt
};