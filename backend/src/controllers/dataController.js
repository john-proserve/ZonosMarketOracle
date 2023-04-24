const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI });
const openai = new OpenAIApi(configuration);

const chatData = async (req, res) => {
    const prompt = req.body.prompt;
    try {
        if(!prompt) {
            res.status(400);
            throw new Error('Error parsing prompt');
        }
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
        });
        const completion = response.data.choices[0].text;
        return res.status(200).json({
            success: true,
            message: completion,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

/**
 * Parse data from request body and return as JSON object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the function.
 */
const parseData = async (req, res) => {
    try {
        // Destructure request body to get name, type, and dataJson properties.
        const { name, type, dataJson } = req.body;

        // Create a dataSource object with the extracted properties.
        const dataSource = {
            "name": name,
            "type": type,
            "dataJson": dataJson,
        };

        // If dataSource is not truthy, throw an error and send a 400 status code.
        if(!dataSource) {
            res.status(400);
            throw new Error('Error parsing data source');
        }

        // Send a 201 status code and the dataSource object as JSON.
        res.status(201).json(dataSource);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    parseData,
    chatData
};
