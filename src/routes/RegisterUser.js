const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ImageUploader = require('./ImageUploader')

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

module.exports = router
