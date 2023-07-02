// 사이즈: backend -> frontend
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { Schema } = mongoose

const User = require('../models/User')

// size api가 없어서, 테스트용으로 임시로 만듦
const sizeProfileSchema = new Schema({
  userId: { type: String },
  length: { type: String },
  shoulderWidth: { type: String },
  chestWidth: { type: String },
})

const SizeProfile = mongoose.model('sizeProfiles', sizeProfileSchema)

// 사이즈 : backend -> frontend
router.get('/api/size', async (req, res) => {
  const { userId } = req.query
  console.log(`get /userInfo/api/size ${userId}`)

  try {
    const sizeProfile = await SizeProfile.findOne({ userId: userId })
    console.log(sizeProfile)

    res.status(201).json({ success: true, message: sizeProfile })
  } catch (error) {
    console.error('Error finding size :', error)
    res.status(500).json({ success: false, error: 'Failed to fetch size.' })
  }
})

router.get('/api/info', async (req, res) => {
  const { userId } = req.query

  try {
    const user = await User.findById({ _id: userId })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'The user was not found.' })
    }
    console.log(user)
    res.status(201).json({ success: true, user })
  } catch (error) {
    console.error('User lookup errors :', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred during user lookup.',
    })
  }
})

router.put('/api/privacy', async (req, res) => {
  //   const user = JSON.parse(req.body)
  const user = req.body
  const userId = user.userId
  console.log(user)

  const update = {
    $set: user,
  }

  try {
    const result = await User.findByIdAndUpdate({ _id: userId }, update)

    // if (result) {}
    res.status(201).json({ success: true, code: 0, user: result })
  } catch (error) {
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    // console.log(error.code)
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    // console.error(error.code, error.message)
    res.status(500).json({
      success: false,
      code: error.code,
      // message: 'An error occurred while updating the document.',
      message: 'An',
    })
  }
})

module.exports = router
