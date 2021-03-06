const jwt = require('jsonwebtoken');
const sauces = require('../models/sauces');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.jwtToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      req.userIdAuth = userId;
      next();
    }
  } catch(error) {
    res.status(401).json({ message : 'Token invalide'});
  };
};