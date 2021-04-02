const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  tabNumber: { type: Number, required: true, unique: true },
  isAdmin: { type: Boolean, required: true },
})

module.exports = model('Employees', schema)
