const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const SizeProfile = require('../models/SizeProfile')
const jwt = require('jsonwebtoken')
const { ImageUploader } = require('./ImageUploader')
const axios = require('axios')
const aiSizeApi = process.env.AI_SIZE_API_URL

router.post(
  '/register',
  (req, res, next) => {
    req.query.type = 'body'
    next()
  },
  ImageUploader.single('file'),
  async (req, res) => {
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
    // 저장한 파일 경로에서 userID 추출
    const userId = req.file.key.split('/')[0]

    try {
      const userExists = await User.findOne({ email: userEmail })

      if (userExists) {
        return res.status(400).json({ msg: '이미 가입된 이메일입니다.' })
      }

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10)

      // 새로운 사용자 생성 및 저장
      const newUser = new User({
        _id: userId,
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
        webAPI = process.env.WEB_API
      }

      // 사용자이미지 전처리 human parse
      const aiApiParseResponse = await axios.post(process.env.AI_PARSE_API, {
        params: { ID: userId, image_url: file },
      })

      if (aiApiParseResponse.data.error) {
        console.error('Error from AI API:', aiApiParseResponse.data.error)
        res.status(500).json({ success: false, error: 'AI API failed.' })
        return
      }

      // 사이즈 받아오기
      const responseFromAIApi = await axios.get(aiSizeApi, {
        params: { height: height, weight: weight },
      })

      if (responseFromAIApi.data.error) {
        console.error('Error from AI API:', responseFromAIApi.data.error)
        res.status(500).json({ success: false, error: 'AI API failed.' })
        return
      }

      const { length, shoulderWidth, chestWidth } = responseFromAIApi.data.size

      // 사이즈 프로필 생성 및 저장
      const newSizeProfile = new SizeProfile({
        userId: newUser._id,
        length,
        shoulderWidth,
        chestWidth,
      })

      await newSizeProfile.save()

      // 사용자 정보 업데이트
      await User.findByIdAndUpdate(newUser._id, {
        sizeProfile: newSizeProfile._id,
      })

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
  }
)

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
