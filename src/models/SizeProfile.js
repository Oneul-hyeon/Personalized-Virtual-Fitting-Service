const mongoose = require('mongoose')
const { Schema } = mongoose

const sizeProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  length: { type: Number },
  shoulderWidth: { type: Number },
  chestWidth: { type: Number },
})

module.exports = mongoose.model('SizeProfile', sizeProfileSchema)
