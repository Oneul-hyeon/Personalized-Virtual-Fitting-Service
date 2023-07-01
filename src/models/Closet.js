const mongoose = require('mongoose')
const { Schema } = mongoose

const closetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clothesImageLink: { type: String, required: true },
  fittingImageLink: { type: String, required: true },
})

module.exports = mongoose.model('Closet', closetSchema)
