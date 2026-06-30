const mongoose = require('mongoose');

const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  }).catch(() => {
    console.log('MongoDB connection failed, retrying in 5s...');
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();
