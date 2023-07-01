const express = require('express')
const router = express.Router()
const ImageUploader = require('./ImageUploader')
const { sendFittingRequest } = require('./FittingImage')

router.post(
  '/api/upload',
  (req, res, next) => {
    req.query.type = 'clothing'
    ImageUploader.single('clothingImage')(req, res, (error) => {
      if (error) {
        return res.status(400).json({ success: false, error: error.message })
      }
      next()
    })
  },
  async (req, res) => {
    // 유효성 검사: 요청 userId 확인
    if (!req.query.userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing userId in request.',
      })
    }

    const userId = req.query.userId
    // 이미지 업로드 확인
    if (!req.file || !req.file.location) {
      return res.status(500).json({
        success: false,
        error: 'Image upload failed.',
      })
    }

    // 이미지 URL을 생성합니다.
    const clothingImageUrl = req.file.location

    // 이미지 업로드 후 sendFittingRequest 함수 호출
    try {
      const fittingImageUrl = await sendFittingRequest(userId, clothingImageUrl)

      // sendFittingRequest 실패
      if (!fittingImageUrl) {
        return res.status(500).json({
          success: false,
          error: 'Fitting image generation failed.',
        })
      }

      // sendFittingRequest 성공
      res.status(201).json({
        success: true,
        message: 'Image uploaded and fitted successfully.',
        imageUrl: clothingImageUrl,
        fittingImageUrl: fittingImageUrl,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Image upload or fitting failed.',
      })
    }
  }
)

module.exports = router
