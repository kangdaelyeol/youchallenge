import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL, {
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
