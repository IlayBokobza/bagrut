const express = require('express')
const User = require("../models/user");
const RestError = require('../utils/restError')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

router.post('/signup',async (req,res) => {
    try{
        let {email,password,name} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser){
            throw new RestError(400,"A user with this email already exists")
        }

        //hash password
        password = await bcrypt.hash(password,10)

        //create token
        const user = new User({email,password,name,tokens:[]})
        const token = jwt.sign({_id:user._id},process.env.JWT_KEY)
        user.tokens = [token];

        await user.save()

        res.status(201)
        res.send(token)
    }
    catch (e) {
        RestError.handle(e,res)
    }
})

router.post('/login',async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            throw RestError.badRequest;
        }

        const user = await User.findOne({email})

        if(!user || !await bcrypt.compare(password,user.password)){
            throw new RestError(400,"Incorrect email or password")
        }

        //create a new token
        const token = jwt.sign({_id:user._id},process.env.JWT_KEY)
        user.tokens.push(token)
        await user.save()

        res.send(token)
    }
    catch (e){
        RestError.handle(e,res)
    }
})

router.get('/me',auth,async (req,res) => {
    try{
        res.send(req.user)
    }
    catch (e){
        RestError.handle(e,res)
    }
})

module.exports = router
