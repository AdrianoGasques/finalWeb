const isAdmin = (req, res, next) => {
    const user = req.user; // Assumindo que o usuário foi definido no middleware de autenticação
    if (user && user.admin) {
      next(); // Permite que a solicitação continue para o próximo middleware ou rota
    } else {
      res.status(403).json({ mensagem: 'Acesso negado. Somente administradores podem executar esta ação.' });
    }
  };
  
  module.exports = isAdmin;
  