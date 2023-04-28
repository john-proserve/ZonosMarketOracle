const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI });
const openai = new OpenAIApi(configuration);

const promptData = async (req, res) => {
    const { prompt } = req.body;
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

module.exports = {
    promptData
};