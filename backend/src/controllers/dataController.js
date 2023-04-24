const parseData = async (req, res) => {
    const { name, type, dataJson } = req.body;
    const dataSource = {
        "name": name,
        "type": type,
        "dataJson": dataJson,
    };
    if(!dataSource) {
        res.status(400);
        throw new Error('Error parsing data source');
    }
    res.status(201).json(dataSource);
}

module.exports = {
    parseData,
};
