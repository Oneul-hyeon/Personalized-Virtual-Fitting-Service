const express = require('express')
const router = express.Router()
const sendAuthMail = require('../modules/AuthMail/AuthMail')

const authStore = new Map()

// 인증 저장소에 이메일-인증값 저장
const addAuth = async (email, authCode) => {
  authStore.set(email, authCode)
  await new Promise((resolve) =>
    setTimeout(resolve, process.env.MAIL_AUTH_TIME)
  )
  if (authStore.has(email)) authStore.delete(email)
}

// 인증 저장소에 저장된 값으로 인증 확인
const checkAuth = (email, authCode) => {
  if (!authStore.has(email)) return false
  else if (authStore.get(email) !== authCode) return false
  else {
    authStore.delete(email)
    return true
  }
}

router.post('/api/sendMail', async (req, res) => {
  const { email } = req.query
  const { authCode, result } = await sendAuthMail(email)
  if (result.success) {
    addAuth(email, authCode)
    res.status(200).json(result)
  } else res.status(500).json(result)
})

router.post('/api/mailAuthCheck', async (req, res) => {
  const { email, authCode } = req.query
  if (checkAuth(email, authCode))
    res.status(200).json({ success: true, code: 'AUTH_CHECK_DONE', errno: 0 })
  else
    res.status(200).json({ success: false, code: 'AUTH_CHECK_FAIL', errno: -1 })
})

module.exports = router
