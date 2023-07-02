const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  file: { type: String, required: true },
  favoriteStyle: {
    style: { type: String, default: '' },
    color: { type: String, default: '' },
    fit: { type: String, default: '정핏' },
  },
  sizeProfile: { type: Schema.Types.ObjectId, ref: 'SizeProfile' },
  clothes: [{ type: Schema.Types.ObjectId, ref: 'Clothes' }],
})

module.exports = mongoose.model('User', userSchema)
