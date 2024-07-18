const express = require('express')
const connectToDb = require('./utils/connectToDB')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
connectToDb()

app.use('/api/user',require('./routes/user'))
app.use('/api/note',require('./routes/note'))

const port = 3000
app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})