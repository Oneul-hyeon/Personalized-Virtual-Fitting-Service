const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')

router.post('/register', async (req, res, next) => {
  const {
    email,
    name,
    phoneNumber,
    password,
    gender,
    height,
    weight,
    file,
    favoriteStyle,
  } = req.body

  try {
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ msg: '이미 가입된 이메일입니다.' })
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10)

    // 새로운 사용자 생성 및 저장
    const newUser = new User({
      email,
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

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(`로그인 에러: ${err}`)
        return next(err)
      }
      if (!user) {
        return res.status(401).json({ success: false, message: info.message })
      }
      req.login(user, (err) => {
        if (err) {
          console.error(`login 에러: ${err}`)
          return next(err)
        }
        return res.status(201).json({ success: true, message: '로그인 성공!' })
      })
    })(req, res, next)
  } catch (error) {
    console.error('Registration Error:', error)
    res.status(500).json({ success: false, error: 'Registration failed.' })
  }
})

module.exports = router
