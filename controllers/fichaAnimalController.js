const FichaAnimal = require('../models/fichaAnimal');

// Criação de uma nova ficha de animal
exports.create = async (req, res) => {
  try {
    const { nome, idade, historico } = req.body;

    const novaFichaAnimal = await FichaAnimal.create({
      nome,
      idade,
      historico
    });

    res.status(201).json({ mensagem: 'Ficha de animal criada com sucesso', fichaAnimal: novaFichaAnimal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar ficha de animal' });
  }
};

// Busca de uma ficha de animal pelo ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const fichaAnimal = await FichaAnimal.findByPk(id);

    if (!fichaAnimal) {
      return res.status(404).json({ mensagem: 'Ficha de animal não encontrada' });
    }

    res.json(fichaAnimal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar ficha de animal' });
  }
};

// Atualização de uma ficha de animal
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, historico } = req.body;

    const fichaAnimal = await FichaAnimal.findByPk(id);

    if (!fichaAnimal) {
      return res.status(404).json({ mensagem: 'Ficha de animal não encontrada' });
    }

    fichaAnimal.nome = nome;
    fichaAnimal.idade = idade;
    fichaAnimal.historico = historico;

    await fichaAnimal.save();

    res.json({ mensagem: 'Ficha de animal atualizada com sucesso', fichaAnimal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar ficha de animal' });
  }
};

// Exclusão de uma ficha de animal
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const fichaAnimal = await FichaAnimal.findByPk(id);

    if (!fichaAnimal) {
      return res.status(404).json({ mensagem: 'Ficha de animal não encontrada' });
    }

    await fichaAnimal.destroy();

    res.json({ mensagem: 'Ficha de animal excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir ficha de animal' });
  }
};
