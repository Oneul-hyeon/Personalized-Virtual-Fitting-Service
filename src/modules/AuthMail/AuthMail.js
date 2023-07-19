const nodemailer = require('nodemailer')
const generateAuthCode = require('./generateAuthCode')

/*
  구글에서는 from 바꾸는 부분 동작하지 않음
  참고 : https://nodemailer.com/usage/using-gmail/
*/
const noreply = 'noreply@model-fit.kro.kr'

async function sendAuthMail(email) {
  try {
    // SMTP 전송을 위한 transporter 생성
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.AUTH_BOT_MAIL,
        pass: process.env.AUTH_BOT_PASS,
      },
    })

    // 이메일 옵션 설정
    const code = generateAuthCode()
    const mailOptions = {
      from: `AuthBot<${noreply}>`,
      to: email,
      subject: 'The authorization code for model.fit.',
      text: `code : ${code}`,
    }

    // 이메일 전송
    const info = await transporter.sendMail(mailOptions)
    console.log(`Email sent successfully : ${email}`)
    return {
      authCode: code,
      result: { success: true, code: 'SEND_DONE', errno: 0 },
    }
  } catch (error) {
    console.error(`Email sent failed : ${email}`)
    return { success: false, code: error.code, errno: -1 }
  }
}

module.exports = sendAuthMail
