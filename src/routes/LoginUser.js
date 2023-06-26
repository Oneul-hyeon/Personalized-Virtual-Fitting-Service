const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('../config/passport')(passport)
const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(`로그인 에러: ${err}`)
      return res.status(500).json({ success: false, message: '서버 오류' })
    }
    if (!user) {
      return res.status(401).json(info)
    }
    const { _id, email } = user
    const jwt_secret = process.env.JWT_SECRET
    const token = jwt.sign({ _id, email }, jwt_secret, { expiresIn: '1h' })

    return res.status(200).json({
      success: true,
      message: '로그인 성공!',
      user: { _id, email },
      token: token,
    })
  })(req, res)
})

module.exports = router
