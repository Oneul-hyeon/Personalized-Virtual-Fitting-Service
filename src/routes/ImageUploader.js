const aws = require('@aws-sdk/client-s3')
const multer = require('multer')
const multers3 = require('multer-s3')
const path = require('path')
const { ObjectId } = require('mongodb')

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
      /*
      회원가입 시 신체 이미지 업로드 하면 아직 DB에 컬럼이 없음.
        => userId 필드는 무조건 undefined가 됨.
        => s3/undefined/에 이미지가 저장 됨
        => id를 생성할 수 있게 [ ?? new ObjectId().toString() ] 추가
      */
      const userId =
        (req.body.userId || req.query.userId) ?? new ObjectId().toString()
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
        imageFilename = file.originalname
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
