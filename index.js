const express = require('express')
const User = require('./models/user')
const connectToDb = require('./utils/connectToDB')
const app = express()

app.use(express.json())
app.use(express.static('public'))
connectToDb()

app.post('/api/signup',async (req,res) => {
    const user = new User(req.body)
    await user.save()

    res.status(201)
    res.send(user._id.toString())
})

app.post('/api/login',async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.sendStatus(400)
        return;
    }

    const user = await User.findOne({email})

    if(!user || user.password !== password){
        res.sendStatus(404)
        return;
    }

    res.send(user._id.toString())
})

app.get('/api/user',async (req,res) => {
    const {id} = req.query
    
    if(!id){
        res.sendStatus(400)
        return;
    }

    const user = await User.findById(id)

    if(!user){
        res.sendStatus(404)
        return;
    }

    res.send(user)
})

const port = 3000
app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})