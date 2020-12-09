const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://daki_group:${password}@reemah.1xrf2.mongodb.net/note-app?retryWrites=true&w=majority`
//`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
// `mongodb+srv://daki_group:<password>@reemah.1xrf2.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
// to create and store note in a database MongoDB
/* const note = new Note({
  content: 'HTML is not as such Easy',
  date: new Date(),
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  //console.log(result)
  mongoose.connection.close()
}) */

//fetch each notes based on the given filteration
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

