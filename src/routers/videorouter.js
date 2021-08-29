import express from 'express';
import {
  postVideoEdit,
  getVideoEdit,
  getUpload,
  postUpload,
  searchVideo,
  seeVideo,
} from '../controllers/videocontroller';
import { uploadMulter } from '../middwares';


import { privateMiddleware } from '../middwares';


const videoRouter = express.Router();

videoRouter
  .route('/upload')
  .get(privateMiddleware, getUpload)
  .post(privateMiddleware, 
    uploadMulter.fields([
      { name: 'video', maxCount: 1 },
      { name: 'thumb', maxCount: 1 },
    ]),
    postUpload,
  );
videoRouter
  .route('/edit/:id([0-9a-z]{24})')
  .get(privateMiddleware, getVideoEdit)
  .post(privateMiddleware, postVideoEdit);
videoRouter.get('/see/:id([0-9a-z]{24})', seeVideo);
videoRouter.get('/search', searchVideo);

export default videoRouter;
