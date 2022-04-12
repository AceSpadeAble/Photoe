const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://photoe:photoe@cluster0.bc856.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const PORT = 8080

app.use(express.urlencoded({extended: false}))
const userRouter = require('./routes/users')


app.use('/users', userRouter)

app.listen(PORT, () => console.log(`it's alive on http//localhost:${PORT}`))