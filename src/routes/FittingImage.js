const express = require('express')
const router = express.Router()
const axios = require('axios')
const webApiurl = process.env.WEB_API
const fittingApiUrl = process.env.AI_FITTING_API_URL

// 피팅 이미지 요청을 보내는 함수
async function sendFittingRequest(userId, clothingImageUrl) {
  const callbackUrl = `${webApiUrl}/api/fitting-image`

  try {
    const response = await axios.post(fittingApiUrl, {
      userId,
      clothingImageUrl,
      callbackUrl,
    })

    // 처리 결과 확인
    if (response.data.success) {
      console.log('Fitting request sent successfully.')
      return response.data.imageUrl // 생성된 이미지 URL 반환
    } else {
      console.error('Error:', response.data.error)
      return null
    }
  } catch (error) {
    console.error('Fitting Request Error:', error)
    return null
  }
}

module.exports = { sendFittingRequest }
