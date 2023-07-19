const express = require('express')
const router = express.Router()
const Closet = require('../models/Closet')
const { ImageUploader } = require('./ImageUploader')

router.post(
  '/cloth-upload',
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
    if (!req.body.userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing userId in request.',
      })
    }

    const userId = req.body.userId
    // 이미지 업로드 확인
    if (!req.file || !req.file.location) {
      return res.status(500).json({
        success: false,
        error: 'Image upload failed.',
      })
    }

    // 이미지 URL을 생성
    const clothingImageUrl = req.file.location

    // 새 Closet 생성 및 저장
    try {
      const newCloset = new Closet({
        userId: userId,
        clothesUrl: req.body.clothesUrl,
        clothesImageLink: clothingImageUrl,
      })

      const savedCloset = await newCloset.save()

      // 성공적으로 저장된 경우 응답
      res.status(200).json({
        success: true,
        message: 'Closet entry created successfully.',
        savedCloset,
      })
    } catch (error) {
      console.error('Error saving to Closet:', error)
      res.status(500).json({
        success: false,
        error: 'Error saving to Closet.',
      })
    }
  }
)

module.exports = router
