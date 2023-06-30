const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ mensagem: 'Acesso não autorizado' });
    }
 // Atribui o objeto do usuário a req.user
    req.userId = decoded.userId;
    next();

  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
};

module.exports = authenticate;