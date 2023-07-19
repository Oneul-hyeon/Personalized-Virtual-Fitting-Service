const express = require('express')
const router = express.Router()
const multer = require('multer')
const Forum = require('../models/Forum')
const path = require('path')
const fs = require('fs')

const uploadsDirectory = path.join(__dirname, '../uploads/')
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory)
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `forum-${Date.now()}.${ext}`)
  },
})
const upload = multer({ storage })

// 게시글 생성
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log(req.body)
    const { user, title, content } = req.body
    const imageURL = req.file ? req.file.path.replace(/\\/g, '/') : ''
    const forum = await Forum.create({
      user,
      title,
      content,
      image: imageURL,
    })
    res.status(201).json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create forum post' })
  }
})

// 게시글 가져오기
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.title
      ? { title: { $regex: `${req.query.title}`, $options: 'i' } }
      : {}

    const forums = await Forum.find(searchQuery)
      .populate('user')
      .sort({ createdAt: -1 })
    res.json(forums)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get forum posts' })
  }
})

// ID로 검색해 가져오기
router.get('/:id', async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id).populate('user')
    if (!forum) {
      return res.status(404).json({ message: 'Forum post not found' })
    }
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get forum post' })
  }
})

// ID로로 검색해 업데이트
router.put('/:id', async (req, res) => {
  try {
    const { title, content, image } = req.body
    const forum = await Forum.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    )
    if (!forum) {
      return res.status(404).json({ message: 'Forum post not found' })
    }
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update forum post' })
  }
})

// ID로 검색해 삭제
router.delete('/:id', async (req, res) => {
  try {
    const forum = await Forum.findById(req.body.id)
    if (!forum) {
      return res.status(404).json({ message: 'Forum post not found' })
    }
    const userId = req.body.userId
    if (forum.user.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    await Forum.findByIdAndDelete(req.body.id)
    res.json({ message: 'Forum post deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete forum post' })
  }
})

module.exports = router
