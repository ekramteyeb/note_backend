require('dotenv').config()
//express node
const express = require('express')
const app = express()
const path = require('path')
const Note = require('./models/note')
const cors = require('cors')


//Json parser ...... express helper
app.use(express.json())
//allow cross origin sharing//
app.use(cors())
//enables the app to consume static files in built front end folder
app.use(express.static('build'))


 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
    
})
app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
        mongoose.connection.close()
    })
})
 app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findById(id).then(note => {
        res.json(note)
    }).catch(e => {
        
        res.status(400).end()
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
app.get('/api/files', (req, res) => {
    res.sendFile(path.join(__dirname + '/prayer_times.js'))
})

const generateId = () => {
        const maxId = notes.length > 0
            ? Math.max(...notes.map(n => n.id))
            : 0
        return maxId + 1
    }
app.post('/api/notes', (req,res) => {
    const body = req.body
    if(!body.content || body.content === undefined){
       return res.status(400).json({error:"no contetnt provided"})
    }else{
        const note = new Note ({
            content:body.content,
            important: body.important || false,
            data: new Date(),
        })
        note.save().then(savedNote => {
            res.json(savedNote)
        })
    }
})

app.put('/api/notes/:id', (req, res) => {    
    const id = Number(req.params.id)
    const note = notes.find(n => n.id === id)
    if(note){
        //const important = req.body.important
        const important = note.important
        const changedNote = { ...note, important: !important }

        notes = notes.map(note => note.id !== id ? note : changedNote)

        res.json(changedNote)
    }else{
       return res.status(400).json({error:"Unkown end point"}).end()
    }
})

//to catch unknown endpoints 
//app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, (error) => {
    console.log(`Server running on port ${PORT}`)
})


const sum2 = (...arguments) => {
    let sumofAll = 0
    for(let i = 0; i < arguments.length; i++){
        sumofAll += arguments[i]
    }
    return sumofAll
}







