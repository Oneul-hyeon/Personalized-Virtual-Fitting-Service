// @ts-check

const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const app = express()
const cors = require('cors')

const uri = process.env.MONGODB_URI
const secretkey = process.env.JWT_SECRET

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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(3000, () => {
  console.log('App Listening on port 3000')
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
