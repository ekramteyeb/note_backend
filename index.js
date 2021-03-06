require('dotenv').config()
// express node
const express = require('express')

const app = express()
const path = require('path')
const cors = require('cors')
const Note = require('./models/note')

// enables the app to consume static files in built front end folder
app.use(express.static('build'))
// Json parser ...... express helper
app.use(express.json())
// allow cross origin sharing//
app.use(cors())
// app.use(logger)
// middleware for unknown endpoint request
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// Middleware for error handler
// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`))
})
app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
    // mongoose.connection.close()
  })
})
app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findById(id).then((note) => {
    console.log(note)
    if (note !== null) {
      res.json(note)
    } else {
      // no matching not found
      res.status(404).end()
    }
  }).catch((error) => {
    next(error)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        response.status(400).send('Note doest exist').end()
      }
      response.status(204).end()
    })
    .catch((error) => next(error))
})
app.get('/api/files', (req, res) => {
  res.sendFile(path.join(`${__dirname}/prayer_times.js`))
})

/* const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
} */
// eslint-disable-next-line consistent-return
app.post('/api/notes', (req, res, next) => {
  const { body } = req
  // there is backend validation in note schema check if this is neccessary or not
  if (!body.content || body.content === undefined) {
    return res.status(400).json({ error: 'no content provided' })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  note.save() // happend chain of promises
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => {
      res.json(savedAndFormattedNote)
    })
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const note = {
    content: req.body.content,
    important: req.body.important,
  }
  Note.findByIdAndUpdate(id, note, { new: true })
    .then((updatedNote) => {
      if (!updatedNote) {
        res.status(400).send('Not doesn\'t exist').end()
      }
      res.json(updatedNote)
    })
    .catch((error) => next(error))
})

// middlewares
// to catch unknown endpoints
app.use(unknownEndpoint)
// handle errors
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, (error) => {
  if (error) {
    console.log(error.message)
  }
  console.log(`Server running on port ${PORT}`)
})

/* const sum2 = (...arguments) => {
    let sumofAll = 0
    for(let i = 0; i < arguments.length; i++){
        sumofAll += arguments[i]
    }
    return sumofAll
}
 */
