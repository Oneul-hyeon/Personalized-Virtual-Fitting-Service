const aws = require('@aws-sdk/client-s3')
const multer = require('multer')
const multers3 = require('multer-s3')
const path = require('path')

const { S3Client, PutObjectCommand } = aws

const s3 = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

const s3ErrorHandler = (error) => {
  if (error) {
    console.error('Error in S3 upload:', error)
  }
}

const ImageUploader = multer({
  storage: multers3({
    s3: s3,
    bucket: 'bigprogect-bucket',
    key: (req, file, callback) => {
      const userId = req.query.userId
      const uploadDirectory = req.query.directory ?? userId
      const extension = path.extname(file.originalname)
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('wrong extension'))
      }

      const imageType = req.query.type
      let imageFilename

      if (imageType === 'body') {
        imageFilename = `userimage${extension}`
      } else if (imageType === 'clothing') {
        const fileName = file.originalname
          .substr(-10)
          .replace(fileExtension, '')
        imageFilename = `${fileName}${extension}`
      } else {
        return callback(new Error('Unknown image type'))
      }

      callback(null, `${uploadDirectory}/${imageFilename}`)
    },
    acl: 'public-read-write',
  }),
  function(err, req, res, next) {
    s3ErrorHandler(err)
    next(err)
  },
})

module.exports = ImageUploader
