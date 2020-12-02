//express node
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3001
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
const password = process.env.CONN_PASS
const url = `mongodb+srv://daki_group:${password}@reemah.1xrf2.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

//Json parser ...... express helper
app.use(express.json())
//allow cross origin sharing//
app.use(cors())
//enables the app to consume static files in built front end folder
app.use(express.static('build'))

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)

/* let notes = [{
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    },
    {
        id: 4,
        content: "Hello world app is coming back ",
        date: "2020-05-30T19:20:14.298Z",
        important: true
    },
    {
        id: 5,
        content: "Hello world of woar : hco",
        date: "2020-05-30T19:20:14.298Z",
        important: true
    }

] */
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
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    }else{
        res.status(400).end()
    }
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
    if(!body.content){
       return res.status(400).json({error:"no contetnt provided"})
    }else{
    const note = {
        content:body.content,
        important: Math.random() < 0.5,
        data: new Date,
        id: generateId()
    }
    console.log(note)
    notes = notes.concat(note)
    res.json(note)
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







