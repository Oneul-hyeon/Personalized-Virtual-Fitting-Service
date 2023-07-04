const express = require('express')
const router = express.Router()
const Clothes = require('../models/Closet')
const User = require('../models/User')
const { getClothesImageUrls } = require('./crawling')
const { deleteImageFromS3 } = require('./ImageUploader')

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
    res.json(
      clothes.map((cloth) => ({
        clothesImageLink: cloth.clothesImageLink,
        _id: cloth._id,
      }))
    )
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

router.delete('/api/delete/:id', async (req, res) => {
  const clothId = req.params.id
  try {
    const cloth = await Clothes.findById(clothId)
    if (!cloth) {
      return res.status(404).json({ error: 'No cloth found for given id' })
    }
    if (cloth.clothesImageLink && cloth.clothesImageLink.trim() !== '') {
      console.log(cloth.clothesImageLink)
      await deleteImageFromS3(cloth.clothesImageLink)
    }

    if (cloth.fittingImageLink && cloth.fittingImageLink.trim() !== '') {
      console.log(cloth.fittingImageLink)
      await deleteImageFromS3(cloth.fittingImageLink)
    }

    await Clothes.findByIdAndDelete(clothId)
    res
      .status(200)
      .json({ message: 'Cloth deleted successfully', code: 'DELETE_DONE' })
  } catch (error) {
    res.status(400).json({ error: 'Error while deleting the cloth' })
  }
})

module.exports = router
