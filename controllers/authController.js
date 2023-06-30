const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Função para gerar o token JWT
const generateToken = (userId, admin = false) => {
  const payload = {
    userId: userId,
    admin: admin
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};


// Rota de login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    // Gerar token JWT apos o login com sucesso
    const token = generateToken(user.id, user.admin);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};
