/// ------- use multer s3 for save image inserver(backend)  -------///
const multer = require('multer');
const multerS3 = require('multer-s3');
const  {S3Client}  = require('@aws-sdk/client-s3');

//////// credendials env file  //////

///////   use multer s3   /////
const bucketName = process.env.BUKET_NAME;     /// name of the bucket is forimg12345

/// store file in aws s3 configuration 
const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID ,
        secretAccessKey:  process.env.SECRET_ACCESS_KEY_ID
    }
})

// Storage configuration 
let Storage = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: Storage });

module.exports = upload