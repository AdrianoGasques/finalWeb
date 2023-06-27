const express = require('express');
const app = express();
const dotenv = require('dotenv');
const installRoutes = require('./routes/installRoutes');
dotenv.config();

// Configurações do Express
app.use(express.json());

// Rotas
const userRoutes = require('./routes/userRoutes');
const fichaAnimalRoutes = require('./routes/fichaAnimalRoutes');
const fichaServicoRoutes = require('./routes/fichaServicoRoutes');

app.use('/api/users', userRoutes);
app.use('/api/fichas-animal', fichaAnimalRoutes);
app.use('/api/fichas-servico', fichaServicoRoutes);
app.use('/install', installRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
