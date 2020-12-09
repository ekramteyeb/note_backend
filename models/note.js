const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then((result) => {
    console.log(result.connections[0].name, 'connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
// contains backend validation
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
})

// modifiy the mongose_id and delete the  __v
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign
    returnedObject.id = returnedObject._id.toString()
    // eslint-disable-next-line no-param-reassign
    delete returnedObject._id
    // eslint-disable-next-line no-param-reassign
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
