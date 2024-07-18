const mongoose = require('mongoose')

const note = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        required:true,
    }
})

const Note = new mongoose.model("Note",note)

module.exports = Note;