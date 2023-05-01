const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI });
const openai = new OpenAIApi(configuration);
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

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
    const systemPrompt = systemText.trim() + '\n\n' + `Today's date is: ${new Date()}.`;

    // First portion of the userMessage
    const userMessageStart = `\n\nNotes from salesperson:\n${freeformNotes}\n\nStore background:\n${storeName} ${backgroundInfo}\n\n`;

    // Get the filepath to the csv file
    const csvPath = path.join(__dirname, `../uploads/${filename}`);
    // Read the csv file
    const data = await readCSVFile(csvPath);
    // Format the csv data into a prompt
    const userData = generateReport(data);
    // Add both user prompts together
    const userMessageComplete = systemPrompt + userMessageStart + userData;
    // Send the prompt to OpenAI
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                // {
                //     role: "system",
                //     content: systemPrompt
                // },
                {
                    role: "user",
                    content: userMessageComplete
                }
            ]
        });
        // Get the response from OpenAI
        const completion = response.data.choices[0].message.content;

        const formattedZonosData = extractProblemsAndRecommendations(completion);


        // Return the response
        return res.status(200).json({
            success: true,
            message: formattedZonosData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

function readCSVFile(file) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(file)
        .pipe(csvParser())
        .on('data', (row) => data.push(row))
        .on('end', () => resolve(data))
        .on('error', (err) => reject(err));
    });
}

function generateReport(data) {
    const startDate = data[0].day;
    const endDate = data[data.length - 1].day;
    const daysCount = new Set(data.map((row) => row.day)).size;

    const countriesData = data.reduce((acc, row) => {
        if (!acc[row.country]) {
            acc[row.country] = {
                visitors: 0,
                sessions: 0,
                pageviews: 0,
                duration: 0,
                bounceRate: 0,
                carts: 0,
                checkouts: 0,
                conversion: 0,
                count: 0,
            };
        }

        if(row.total_visitors)
            acc[row.country].visitors += parseInt(row.total_visitors);
        if(row.total_sessions)
            acc[row.country].sessions += parseInt(row.total_sessions);
        if(row.total_pageviews)
        acc[row.country].pageviews += parseInt(row.total_pageviews);
        if (row.avg_duration)
            acc[row.country].duration += parseInt(row.avg_duration.split(':')[1]);
        if(row.bounce_rate)
            acc[row.country].bounceRate += parseFloat(row.bounce_rate);
        if(row.total_carts)
            acc[row.country].carts += parseInt(row.total_carts);
        if(row.total_checkouts)
            acc[row.country].checkouts += parseInt(row.total_checkouts);
        if(row.total_conversion)
            acc[row.country].conversion += parseFloat(row.total_conversion);
        acc[row.country].count++;

        return acc;
    }, {});

    let report = `Date Range: ${startDate} to ${endDate}\nNumber of Days: ${daysCount}\n\n`;

    for (const country in countriesData) {
        const countryData = countriesData[country];
        report += `${country} Data:\n`;
        report += `- Average Visitors per Day: ${(countryData.visitors / daysCount).toFixed(2)}\n`;
        report += `- Average Sessions per Day: ${(countryData.sessions / daysCount).toFixed(2)}\n`;
        report += `- Average Pageviews per Day: ${(countryData.pageviews / daysCount).toFixed(2)}\n`;
        report += `- Average Session Duration: 00:${(countryData.duration / countryData.count).toFixed(0)}:00\n`;
        report += `- Average Bounce Rate: ${(countryData.bounceRate / countryData.count).toFixed(2)}\n`;
        report += `- Average Total Carts per Day: ${(countryData.carts / daysCount).toFixed(2)}\n`;
        report += `- Average Total Checkouts per Day: ${(countryData.checkouts / daysCount).toFixed(2)}\n`;
        report += `- Average Conversion Rate: ${(countryData.conversion / countryData.count).toFixed(2)}\n\n`;
    }

    return report;
}

// Function to extract problems and recommendations
function extractProblemsAndRecommendations(data) {
    const regex = /\d\.\s(?!.*\*\*)(.*?):\s(.*?)(?=\n\n\d\.|$)/g;
    const problemsAndRecommendations = [];
  
    let match;
    while ((match = regex.exec(data)) !== null) {
      problemsAndRecommendations.push({
        problem: match[1],
        recommendation: match[2],
      });
    }
  
    return problemsAndRecommendations;
  }

module.exports = {
    sagePrompt
};