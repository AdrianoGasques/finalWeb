const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.userId = decoded.userId;
    next();
  });
}

module.exports = authMiddleware;
