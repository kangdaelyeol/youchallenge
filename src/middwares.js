import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from "aws-sdk";

export const localsMiddleware = (req, res, next) => {
  res.locals.user = req.session.user || false;
  res.locals.login = req.session.login || false;
  next();
};

export const uploadMulter = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10000000,
  },
});

export const publicMiddleware = (req, res, next) => {
  if(req.session.login) return res.send(404);
  else next();
}

export const privateMiddleware = (req, res, next) => {
  if(!req.session.login) return res.send(404);
  else next();
}