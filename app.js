const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


app.use(cors());

// Configurações do Express
app.use(express.json());

// Rotas
const installRoutes = require('./routes/installRoutes');
const userRoutes = require('./routes/userRoutes');
const fichaAnimalRoutes = require('./routes/fichaAnimalRoutes');
const fichaServicoRoutes = require('./routes/fichaServicoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/users', userRoutes);
app.use('/api/fichas-animal', fichaAnimalRoutes);
app.use('/api/fichas-servico', fichaServicoRoutes);
app.use('/api/auth', authRoutes);
app.use('/install', installRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
