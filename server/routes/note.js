const express = require('express')
const Note = require('../models/note')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/',auth,async (req,res) => {
    const {text} = req.body

    const note = new Note({text,owner:req.user._id})
    await note.save()

    res.send(note._id.toString())
})

router.get('/',auth,async (req,res) => {
    const notes = await Note.find({owner:req.user._id})
    res.send(notes)
})

router.delete('/',auth,async (req,res) => {
    const id = req.query.id

    if(!id){
        res.send(400)
        return;
    }

    const note = await Note.findById(id)
    if(!note){
        res.send(404)
        return;
    }

    if(note.owner.toString() != req.user._id.toString()){
        res.send(403)
        return;
    }

    await Note.findByIdAndDelete(note._id)
    res.send()
})

module.exports = router