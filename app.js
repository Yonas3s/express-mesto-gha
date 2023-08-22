const httpConstants = require('http2').constants;
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/error-handler')
const router = require('./routes/index');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env; // 127.0.0.1

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(helmet())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(router);

app.use(errors())

app.use(errorHandler);

app.listen(PORT);
