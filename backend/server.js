// Requires
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./src/routes/dataRoutes');

// Instance variables
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/data', dataRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
