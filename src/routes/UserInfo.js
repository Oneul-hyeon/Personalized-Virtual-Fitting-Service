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
    const user = await User.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'The user was not found.' })
    }
    res.status(201).json({ success: true, user })
  } catch (error) {
    console.error('User lookup errors :', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred during user lookup.',
    })
  }
})

// 사용자 신체 이미지 경로 전송
router.get('/api/userimage', async (req, res) => {
  const { userId } = req.query

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'The user was not found.' })
    }
    res.status(200).json({ success: true, image: user.file })
  } catch (error) {
    console.error('User lookup errors :', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred during user lookup.',
    })
  }
})

module.exports = router
