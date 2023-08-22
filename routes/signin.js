const router = require('express').Router();
const { login } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), login);

module.exports = router