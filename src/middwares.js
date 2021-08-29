import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

// AWS config

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

const S3Storage = multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: 'wechallengebucket/',
});

export const localsMiddleware = (req, res, next) => {
  res.locals.user = req.session.user || false;
  res.locals.login = req.session.login || false;
  next();
};
const heroku = process.env.NODE_ENV === "production";
export const uploadMulter = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10000000,
  },
  storage: heroku ? S3Storage : undefined,
});

export const publicMiddleware = (req, res, next) => {
  if (req.session.login) return res.send(404);
  else next();
};

export const privateMiddleware = (req, res, next) => {
  if (!req.session.login) return res.send(404);
  else next();
};
