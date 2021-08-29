import express from 'express';
import { addViews, deleteComment, enrollComment } from '../controllers/videocontroller';

const apiRouter = express.Router();

apiRouter.post('/video/:id([0-9a-z]{24})/comment', enrollComment);
apiRouter.post('/video/:id([0-9a-z]{24})/delete', deleteComment)
apiRouter.post('/video/:id([0-9a-z]{24})/addview', addViews);
export default apiRouter;
