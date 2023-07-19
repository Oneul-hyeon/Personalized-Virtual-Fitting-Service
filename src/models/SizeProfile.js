const mongoose = require('mongoose')
const { Schema } = mongoose

const sizeProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  length: { type: Number, required: true },
  shoulderWidth: { type: Number, required: true },
  chestWidth: { type: Number, required: true },
})

module.exports = mongoose.model('SizeProfile', sizeProfileSchema)
