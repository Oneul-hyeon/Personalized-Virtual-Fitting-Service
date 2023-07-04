// 사이즈: backend -> frontend
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { Schema } = mongoose

const axios = require('axios')

const User = require('../models/User')
const SizeProfile = require('../models/SizeProfile')

const sizeAPI = process.env.AI_SIZE_API_URL

const { ImageUploader } = require('./ImageUploader')

// 사이즈 : backend -> frontend
router.get('/api/size', async (req, res) => {
  console.log('get /userInfo/api/size')
  const { userId } = req.query
  try {
    const sizeProfile = await SizeProfile.findOne({ userId: userId })
    res.status(201).json({ success: true, message: sizeProfile })
  } catch (error) {
    console.error('Error finding size :', error)
    res.status(500).json({ success: false, error: 'Failed to fetch size.' })
  }
})

router.get('/api/info', async (req, res) => {
  console.log('get /userInfo/api/info')

  const { userId } = req.query

  try {
    const user = await User.findById({ _id: userId })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'The user was not found.' })
    }
    res.status(201).json({ success: true, user })
  } catch (error) {
    console.error('User lookup errors :', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred during user lookup.',
    })
  }
})

// 사용자 정보 업데이트
router.put('/api/privacy', async (req, res) => {
  console.log('put /userInfo/api/privacy')
  const user = req.body
  const userId = user.userId

  const update = {
    $set: user,
  }

  try {
    const result = await User.findByIdAndUpdate({ _id: userId }, update)

    res.status(201).json({ success: true, code: 'UPDATE_DONE', errno: 0 })
  } catch (error) {
    res.status(500).json({
      success: false,
      code: error.codeName,
      errno: error.code,
      /* message: 'An error occurred while updating the document.', */
    })
  }
})

// 사이즈 정보 업데이트
router.put('/api/size', async (req, res) => {
  console.log('put /userInfo/api/size')
  const reqSize = req.body
  const userId = reqSize.userId

  let isShoulderWidthNull = reqSize.shoulderWidth ? false : true
  let isChestWidthNull = reqSize.chestWidth ? false : true
  let isLengthNull = reqSize.length ? false : true

  let sizeData = {
    shoulderWidth: reqSize.shoulderWidth,
    chestWidth: reqSize.chestWidth,
    length: reqSize.length,
  }
  let userData = { height: reqSize.height, weight: reqSize.weight }
  let sizeResponse

  // 하나라도 null인 경우 size api 사용해서 값 가져옴
  if (isShoulderWidthNull || isChestWidthNull || isLengthNull) {
    sizeResponse = await axios.get(sizeAPI, {
      params: userData,
    })
    // null인 값 sizeRes로 채워줌
    if (isShoulderWidthNull)
      sizeData.shoulderWidth = sizeResponse.data.size.shoulderWidth
    if (isChestWidthNull)
      sizeData.chestWidth = sizeResponse.data.size.chestWidth
    if (isLengthNull) sizeData.length = sizeResponse.data.size.length

    if (sizeResponse.data.error) {
      console.error('Error from AI API:', sizeResponse.data.error)
      res
        .status(500)
        .json({ success: false, code: 'SIZE_API_FAILED', errno: -1 })
      return
    }
  }

  try {
    const userUpdateRes = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: userData,
      },
      { new: true }
    )
    const sizeUpdateRes = await SizeProfile.findOneAndUpdate(
      { userId: userId },
      {
        $set: sizeData,
      },
      { new: true }
    )

    res.status(201).json({ success: true, code: 'UPDATE_DONE', errno: 0 })
  } catch (error) {
    res.status(500).json({
      success: false,
      code: error.codeName,
      errno: error.code,
    })
  }
})

// 사용자 신체 이미지 경로 전송
router.get('/api/userimage', async (req, res) => {
  const { userId } = req.query

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'The user was not found.' })
    }
    res.status(200).json({ success: true, image: user.file })
  } catch (error) {
    console.error('User lookup errors :', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred during user lookup.',
    })
  }
})

// kyi : 이거 뭐죠? 제가 만든 건가요? 흠..
router.post(
  '/api/userimage/change',
  ImageUploader.single('image'),
  async (req, res) => {
    try {
      if (req.file) {
        res.status(200).json({ imageUrl: req.file.location })
      } else {
        res.status(400).send({ error: 'Image upload failed' })
      }
    } catch (error) {
      console.error('Error processing image upload:', error)
      res.status(500).send({ error: 'Error processing image upload' })
    }
  }
)

// router.post(
router.put(
  '/api/userimage',
  (req, res, next) => {
    console.log(req)
    req.query.type = 'body'
    next()
  },
  ImageUploader.single('file'),
  async (req, res) => {
    console.log('Step 2: Handling the response')
    // const file = req.body.file
    const file = req.file ? req.file.location : undefined
    // 파라미터에서 이미지 ID 추출하고 없다면, 저장한 파일 경로에서 userID 추출
    const userId =
      (req.body.userId || req.query.userId) ?? req.file.key.split('/')[0]
    console.log(file)
    try {
      // 업데이트할 정보
      const update = {
        $set: { file: file },
      }
      // 업데이트로 수정
      const result = await User.findByIdAndUpdate({ _id: userId }, update)

      const port = process.env.PORT
      let webAPI

      if (process.env.NODE_ENV === 'development') {
        webAPI = `http://localhost:${port}`
      } else {
        webAPI = process.env.WEB_API
      }
      console.log('before parse!1')
      console.log({
        params: { ID: userId, image_url: file },
      })
      // 사용자이미지 전처리 human parse
      const aiApiParseResponse = await axios.post(
        process.env.AI_PARSE_API,
        null,
        {
          params: { ID: userId, image_url: file },
        }
      )
      console.log('parse complete!')

      console.log(aiApiParseResponse.data)
      if (aiApiParseResponse.data.error) {
        console.error('Error from AI API:', aiApiParseResponse.data.error)
        res
          .status(500)
          .json({ success: false, error: 'AI API failed.', errno: -1 })
      }

      console.log('done!')
      res
        .status(200)
        .json({ success: true, code: 'IMAGE_CHANGE_DONE', errno: 0, url: file })
    } catch (error) {
      console.error('Profile Image CHange Error:', error)
      res
        .status(500)
        .json({ success: false, code: 'IMAGE_CHANGE_FAIL', errno: -1 })
    }
  }
)

module.exports = router
