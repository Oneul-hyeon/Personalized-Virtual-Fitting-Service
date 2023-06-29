const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const SizeProfile = require('../models/SizeProfile')
const jwt = require('jsonwebtoken')
const ImageUploader = require('./ImageUploader')
const axios = require('axios')

router.post('/register', ImageUploader.single('file'), async (req, res) => {
  const {
    email: userEmail,
    name,
    phoneNumber,
    password,
    gender,
    height,
    weight,
    favoriteStyle,
  } = req.body
  const file = req.file ? req.file.location : undefined

  try {
    const userExists = await User.findOne({ email: userEmail })

    if (userExists) {
      return res.status(400).json({ msg: '이미 가입된 이메일입니다.' })
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10)

    // 새로운 사용자 생성 및 저장
    const newUser = new User({
      email: userEmail,
      name,
      phoneNumber,
      password: hashedPassword,
      gender,
      height,
      weight,
      file,
      favoriteStyle,
    })

    await newUser.save()

    const port = process.env.PORT
    let webAPI

    if (process.env.NODE_ENV === 'development') {
      webAPI = `http://localhost:${port}`
    } else {
      webAPI = 'http://www.model-fit.kro.kr'
    }

    // 사이즈 받아오기
    const aiAPI = process.env.AI_API
    const aiApiEndpoint = `${aiAPI}/${AI_SIZE_ENDPOINT}`
    const responseFromAIApi = await axios.post(aiApiEndpoint, {
      imageUrl: file,
      height,
      weight,
      userId: newUser._id,
      callbackUrl: `${webAPI}/api/size`,
    })

    if (responseFromAIApi.data.error) {
      console.error('Error from AI API:', responseFromAIApi.data.error)
      res.status(500).json({ success: false, error: 'AI API failed.' })
      return
    }

    // 자동로그인
    const { _id, email } = newUser
    const jwt_secret = process.env.JWT_SECRET
    const token = jwt.sign({ _id, email }, jwt_secret, { expiresIn: '1h' })

    return res.status(201).json({
      success: true,
      message: '가입 및 로그인 성공!',
      user: { _id, email },
      token: token,
    })
  } catch (error) {
    console.error('Registration Error:', error)
    res.status(500).json({ success: false, error: 'Registration failed.' })
  }
})

// 사이즈 정보 받아오기
router.post('/api/size', async (req, res) => {
  const { userId, length, shoulderWidth, chestWidth } = req.body

  try {
    const newSizeProfile = new SizeProfile({
      userId,
      length,
      shoulderWidth,
      chestWidth,
    })

    await newSizeProfile.save()
    await User.findByIdAndUpdate(userId, { sizeProfile: newSizeProfile._id })

    res.status(201).json({ success: true, message: 'Size profile created!' })
  } catch (error) {
    console.error('Callback Error:', error)
    res
      .status(500)
      .json({ success: false, error: 'Size profile creation failed.' })
  }
})

module.exports = router
