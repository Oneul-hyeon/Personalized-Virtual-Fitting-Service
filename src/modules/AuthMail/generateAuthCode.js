const crypto = require('crypto')

// 6자리의 숫자로만 구성된 난수 생성
function generateAuthCode() {
  const byteLength = 4

  const buffer = crypto.randomBytes(byteLength)
  const randomCode = parseInt(buffer.toString('hex'), 16).toString().slice(0, 6)

  return randomCode
}

module.exports = generateAuthCode
