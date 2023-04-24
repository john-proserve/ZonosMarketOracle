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

export default {
    parseData,
};
