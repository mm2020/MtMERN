import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/sample', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error(' !!!!! Connection error !!!!! ', err.message);
  });

export const db = mongoose.connection;

db.on('connected', () => {
  console.log(' o MongoDB runinig on port', 27017, '>>> ');
});

db.on('error', (err) => {
  console.log(' x Mongoose default connection error: ' + err);
});

db.on('disconnected', () => {
  console.log(' x Mongoose default connection disconnected');
});

// process.on('SIGINT', () => {
//   db.close(() => {
//     console.log(
//       ' x Mongoose default connection disconnected through app termination'
//     );
//     process.exit(0);
//   });
// });
