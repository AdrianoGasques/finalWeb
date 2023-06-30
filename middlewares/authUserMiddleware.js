const authorizeUser = (req, res, next) => {
  const tokenUserId = parseInt(req.userId); // Converte para inteiro
  const requestedUserId = parseInt(req.params.id); // Converte para inteiro
    console.log('Token UserID:', tokenUserId);
    console.log('Requested UserID:', requestedUserId);
    // Verifica se o ID do usuário solicitado é o mesmo do usuário autenticado
    if (tokenUserId !== requestedUserId) {
        console.log('acesso negado');
      return res.status(403).json({ mensagem: 'Acesso negado. Você não tem permissão para acessar este recurso.' });
    }
  
    // Se o ID do usuário solicitado for o mesmo do usuário autenticado, permite a continuação da solicitação
    next();
  };
  
  module.exports = authorizeUser;
  
  

