const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).json({ success: true, message: '로그아웃 성공!' })
})

module.exports = router
