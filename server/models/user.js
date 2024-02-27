const mongoose = require('mongoose')

const user = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    tokens:{
        type:Array,
        default:[],
    }
})

const User = new mongoose.model("User",user)

module.exports = User;