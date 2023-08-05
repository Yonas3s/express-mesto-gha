const bodyParser = require('body-parser');
const httpConstants = require('http2').constants;
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');


const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env; // 127.0.0.1

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64ca895942b89c480de36770',
  };

  next();
});

app.use(router);

app.all('*', (req, res) => {
  res.status(httpConstants.HTTP_STATUS_NOT_FOUND).json({ message: 'Not Found' });
});

app.listen(PORT);
