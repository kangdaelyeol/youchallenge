import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/rkdeofuf', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

const handledb = () => {
  console.log('connect DB ❤');
};

db.on('open', handledb);
db.once('error', (error) => {
  console.log(error);
});
