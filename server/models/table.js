const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  serialNumber: { type: Number, required: true },
  operation: { type: String, required: true },
  division: { type: String, required: true },
  coefficient: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  recalculation: { type: Number, required: true },
  owner: { type: Types.ObjectId, ref: 'Employees' },
})


module.exports = model('Table', schema)
