const express = require('express')
const router = express.Router()
const Clothes = require('../models/Closet')
const User = require('../models/User')

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

module.exports = router
