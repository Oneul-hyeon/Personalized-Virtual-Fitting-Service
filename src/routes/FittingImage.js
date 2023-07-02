const express = require('express')
const router = express.Router()
const axios = require('axios')
const https = require('https')
const User = require('../models/User')
const Closet = require('../models/Closet')
const fittingApiUrl = process.env.AI_FITTING_API_URL

async function isImageValid(imageUrl) {
  return new Promise((resolve, reject) => {
    https
      .head(imageUrl, (res) => {
        if (res.statusCode === 200) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .on('error', (error) => {
        console.error(`Error checking image URL: ${imageUrl}`, error)
        resolve(false)
      })
  })
}

router.post('/fitting', async (req, res) => {
  try {
    const { userId, clothUrl } = req.body

    // 사용자 이미지 가져오기
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const userImageUrl = user.file

    // 이미 피팅이미지가 있으면
    if (Closet && Closet.fittingImageLink) {
      const isValid = await isImageValid(Closet.fittingImageLink)
      if (isValid) {
        return res
          .status(200)
          .json({ fittingImageLink: Closet.fittingImageLink })
      } else {
        console.warn(
          'Stored fittingImageLink is not valid. Fetching new image.'
        )
      }
    }

    const response = await axios.post(fittingApiUrl, {
      ID: userId,
      image_url: userImageUrl,
      cloth_url: clothUrl,
    })

    if (response.data.success) {
      console.log('Fitting request sent successfully.')

      const imageUrl = response.data.file_name
      await Closet.updateOne(
        { userId, clothesImageLink: clothUrl },
        { $set: { fittingImageLink: imageUrl } }
      )

      res.status(200).json({ fittingImageLink: imageUrl })
    } else {
      console.error('Error:', response.data.error)
      res.status(500).json({ error: response.data.error })
    }
  } catch (error) {
    console.error('Fitting Request Error:', error)
    res.status(500).json({ error: 'Fitting Request Error' })
  }
})

module.exports = router
