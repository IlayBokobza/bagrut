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

module.exports = router