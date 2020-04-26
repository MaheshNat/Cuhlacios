const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  teacher: String,
  due: String,
  completion: Boolean,
  gradeType: String,
  answers: Array
})

module.exports = mongoose.model('Assignment', assignmentSchema)
