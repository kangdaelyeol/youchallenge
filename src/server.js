import "regenerator-runtime";
import "dotenv/config";
import './db';
import "./model/comment"
import "./model/user";
import "./model/video";
import express from 'express';
import session from 'express-session';
import { default as globalRouter } from './routers/globalrouter';
import { localsMiddleware } from './middwares';
import { default as videoRouter } from './routers/videorouter';
import apiRouter from './routers/apirouter';
import MongoStore from 'connect-mongo';
const app = express();
const PORT = process.env.PORT || 4001;

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

//  middleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL || undefined,
    }),
  }),
);
app.use(localsMiddleware);
app.use('/static', express.static('assets'));
app.use('/uploads', express.static('uploads'));
app.use('/api', apiRouter);
// router

app.use('/', globalRouter);
app.use('/video', videoRouter);

const handleListener = () => {
  console.log(`PORT: ${PORT} listen! ✔`);
};

app.listen(PORT, handleListener);
