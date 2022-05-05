const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect()

const PORT = 8080

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
const userRouter = require('./routes/users')
const photoRouter = require('./routes/photos')

app.use('/users', userRouter)
app.use('/photos', photoRouter)

app.listen(PORT, () => console.log(`it's alive on http//localhost:${PORT}`))
