import cors from 'cors';
import express from 'express';

import { db } from './db';
import { optionRouter } from './routes';

const app = express();

app.set('apiPort', 3000);

db.once('open', () => {});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hi, from server "localhost:' + app.get('apiPort') + '/"');
});

app.use('/api', optionRouter);

app.listen(app.get('apiPort'), () => {
  console.log(' o Server runinig on port', app.get('apiPort'), '>>> ');
});
