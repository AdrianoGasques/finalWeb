const FichaServico = require('../models/fichaServico');
const FichaAnimal = require('../models/fichaAnimal');
const User = require('../models/user');

// Criação de uma nova ficha de serviço
exports.create = async (req, res) => {
  try {
    const { nomeAnimal, dono, dataEntrada, problema } = req.body;

    const fichaServico = await FichaServico.create({
      nomeAnimal,
      dono,
      dataEntrada,
      problema
    });

    res.status(201).json({ mensagem: 'Ficha de serviço criada com sucesso', fichaServico });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar ficha de serviço' });
  }
};

// Busca de uma ficha de serviço pelo ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const fichaServico = await FichaServico.findByPk(id);

    if (!fichaServico) {
      return res.status(404).json({ mensagem: 'Ficha de serviço não encontrada' });
    }

    res.json(fichaServico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar ficha de serviço' });
  }
};

// Atualização de uma ficha de serviço
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeAnimal, dono, dataEntrada, problema } = req.body;

    const fichaServico = await FichaServico.findByPk(id);

    if (!fichaServico) {
      return res.status(404).json({ mensagem: 'Ficha de serviço não encontrada' });
    }

    fichaServico.nomeAnimal = nomeAnimal;
    fichaServico.dono = dono;
    fichaServico.dataEntrada = dataEntrada;
    fichaServico.problema = problema;

    await fichaServico.save();

    res.json({ mensagem: 'Ficha de serviço atualizada com sucesso', fichaServico });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar ficha de serviço' });
  }
};

// Exclusão de uma ficha de serviço
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const fichaServico = await FichaServico.findByPk(id);

    if (!fichaServico) {
      return res.status(404).json({ mensagem: 'Ficha de serviço não encontrada' });
    }

    await fichaServico.destroy();

    res.json({ mensagem: 'Ficha de serviço excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir ficha de serviço' });
  }
};
