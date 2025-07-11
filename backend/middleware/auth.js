const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send('Token required');
  try {
    req.user = jwt.verify(token, 'secret');
    next();
  } catch {
    res.status(403).send('Invalid token');
  }
};