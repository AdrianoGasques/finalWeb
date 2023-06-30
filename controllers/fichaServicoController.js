const FichaServico = require('../models/fichaServico');
const FichaAnimal = require('../models/fichaAnimal');
const User = require('../models/user');

// Criação de uma nova ficha de serviço
exports.create = async (req, res) => {
  try {
    const { userId, animalId } = req.params; // Obtém os IDs do usuário e do animal da URL
    const { problema } = req.body; // Obtém os dados da ficha do corpo da requisição

    // Cria a ficha e associa-a ao usuário e ao animal pelos IDs
    const ficha = await FichaServico.create({ 
      problema, 
      id_user: userId, 
      animal_id: animalId });

    res.json(ficha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar ficha' });
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


exports.getAnimalByFicha = async (req, res) => {
  try {
    const { fichaId } = req.params; // Obtém o ID da ficha da URL

    // Consulta a ficha de serviço com base no ID
    const ficha = await FichaServico.findByPk(fichaId);

    if (!ficha) {
      return res.status(404).json({ mensagem: 'Ficha não encontrada' });
    }

    // Verifica se a ficha está associada a um animal
    if (!ficha.animal_id) {
      return res.status(404).json({ mensagem: 'Animal não encontrado' });
    }

    // Consulta o animal associado à ficha somente se ele estiver vinculado a um usuário
    const animal = await FichaAnimal.findOne({ where: { id: ficha.animal_id, id_user: ficha.id_user } });

    if (!animal) {
      return res.status(404).json({ mensagem: 'Animal não encontrado ou não associado ao usuário' });
    }

    res.json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao consultar animal' });
  }
};
