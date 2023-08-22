const jwt = require('jsonwebtoken');
const UnauthorizedStatus = require('../errors/UnauthorizedStatus');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedStatus('Необходима авторизация.')
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'mesto');
  } catch (err) {
    throw new UnauthorizedStatus('Необходима авторизация.')
  }
  req.user = payload;
  next();
};