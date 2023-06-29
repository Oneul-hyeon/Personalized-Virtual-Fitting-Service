// @ts-check

const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const app = express()
const cors = require('cors')
const multer = require('multer')

const uri = process.env.MONGODB_URI
const secretkey = process.env.JWT_SECRET
const port = process.env.PORT || 3000
const aiAPI = process.env.AI_API

const allowedOrigins = [
  'http://localhost:3000',
  'http://www.model-fit.kro.kr',
  aiAPI,
]

if (!uri) {
  throw new Error('MONGODB_URI is not defined in .env file')
}
if (!secretkey) {
  throw new Error('JWT_SECRET is not defined in .env file')
}

mongoose
  .connect(uri, { dbName: 'modelfit' })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = '다음 도메인은 허용되지 않습니다: ' + origin
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
  })
)
app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(port, () => {
  console.log(`App Listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, '../style/build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../style/build/index.html'))
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../style/build/index.html'))
})

const usersRouter = require('./routes/RegisterUser')
const loginRouter = require('./routes/LoginUser')
const logoutRouter = require('./routes/LogoutUser')
app.use('/users', usersRouter)
app.use('/users', loginRouter)
app.use('/users', logoutRouter)
