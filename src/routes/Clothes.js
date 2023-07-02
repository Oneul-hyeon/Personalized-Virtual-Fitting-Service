const express = require('express')
const router = express.Router()
const Clothes = require('../models/Closet')
const User = require('../models/User')
const { getClothesImageUrls } = require('./crawling')

router.get('/api/clothes', async (req, res) => {
  const { userId } = req.query
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'The user was not found.' })
    }
    const clothes = await Clothes.find({ userId: userId })
    res.json(clothes.map((cloth) => cloth.clothesImageLink))
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// 입력받은 url에서 이미지 링크 검색 후 반환
router.get('/api/clothesFromUrl', async (req, res) => {
  const { url } = req.query

  const result = await getClothesImageUrls(url)
  if (result.success) {
    console.log('success')
    return res.status(200).json(result)
  } else {
    return res.status(500).json(result)
  }
})

module.exports = router
