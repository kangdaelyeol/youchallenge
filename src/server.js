import './db';
import express from 'express';
import session from 'express-session';
import { default as globalRouter } from './routers/globalrouter';
import { localsMiddleware } from './middwares';
import { default as videoRouter } from './routers/videorouter';
import apiRouter from './routers/apirouter';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = 4001;

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

//  middleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'abckdqow',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/rkdeofuf',
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
