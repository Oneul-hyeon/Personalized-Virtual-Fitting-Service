// @ts-check

const exp = require('constants')
const express = require('express')

const path = require('path')

const app = express()

app.use(express.json())
var cors = require('cors')
app.use(cors())

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
