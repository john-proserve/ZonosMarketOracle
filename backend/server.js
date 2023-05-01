require('dotenv').config()

const express = require('express')
const app = express()
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 8080

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/upload', require('./routes/fileRoutes'));
app.use('/sage', require('./routes/sageRoutes'));

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))