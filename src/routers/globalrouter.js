import express from 'express';
import {
  home,
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
  getProfile,
  getEditProfile,
  postEditProfile,
  getChangePW,
  postChangePW,
} from '../controllers/usercontroller';

import { publicMiddleware, privateMiddleware } from '../middwares';

const globalRouter = express.Router();

globalRouter.get('/', home);
// globalRouter.get('/video', seevideo);
globalRouter.route('/login').get(publicMiddleware, getLogin).post(publicMiddleware, postLogin);
globalRouter.route('/join').get(publicMiddleware, getJoin).post(publicMiddleware, postJoin);
globalRouter.get('/logout', privateMiddleware ,logout);
globalRouter.get('/myprofile/:id([0-9a-z]{24})', privateMiddleware, getProfile);
globalRouter
  .route('/editprofile/:id([0-9a-z]{24})')
  .get(privateMiddleware, getEditProfile)
  .post(privateMiddleware, postEditProfile);
globalRouter
  .route('/changepassword/:id([0-9a-z]{24})')
  .get(privateMiddleware, getChangePW)
  .post(privateMiddleware, postChangePW);
export default globalRouter;
