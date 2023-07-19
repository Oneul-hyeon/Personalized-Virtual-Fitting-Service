const express = require('express')
const router = express.Router()
const User = require('../models/User')
const SizeProfile = require('../models/SizeProfile')
const Closet = require('../models/Closet')
const axios = require('axios')

router.post('/cloth_size', async (req, res) => {
  try {
    const { userId, clothId } = req.body

    const user = await User.findById(userId).populate('sizeProfile')
    const sizeProfile = user.sizeProfile
    const closet = await Closet.findById(clothId)

    const length = sizeProfile.length
    const shoulderWidth = sizeProfile.shoulderWidth
    const chestWidth = sizeProfile.chestWidth
    const imageUrl = closet.clothesUrl
    const overfit = user.favoriteStyle.fit

    const aiApiResponse = await axios.get(process.env.AI_CLOTH_SIZE_API_URL, {
      params: {
        length,
        shoulderWidth,
        chestWidth,
        imageUrl,
        overfit,
      },
    })

    const recommendedSize = aiApiResponse.data.size
    res.json({ size: recommendedSize })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
