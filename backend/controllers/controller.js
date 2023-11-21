const db = require("../config/db_config.js");
const Funcionario = db.Funcionario;

exports.createFuncionario = async (req, res) => {
  let funcionario = {};
  try {
    //Capturando os dados do body e criando a constante cliente
    const { nome, sobrenome, email, cpf, funcao } = req.body;
    funcionario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      cpf: cpf,
      ativo: "ativo",
      funcao: funcao,
    };

    Funcionario.create(funcionario).then((result) => {
      res.status(200).json({
        message: "Funcionario criado com sucesso",
        body: result
      });
    }).catch((error) =>{
      res.status(400).json({
        message: "Erro ao cadastrar o usuário",
        body: error
      })
    });
  } catch (error) {
    res.status(404).json({
      message: "Failll",
      error: error.message,
    });
  }
};

exports.getFuncionario = async (req, res) => {
  const { id } = req.params;

  const filtro = {
    where: {
      id: id,
    },
    attributes: ["id", "nome", "sobrenome", "email", "cpf", "funcao", "ativo"],
  };

  try {
    const funcionario = await Funcionario.findOne(filtro);
    if (!funcionario) {
      return res.status(404).json({
        message: "Error!",
        error: "Usuario not found.",
      });
    }

    return res.status(200).json(funcionario.dataValues);
  } catch (error) {
    res.status(500).json({
      messae: "Error!",
      error: error,
    });
  }
};

exports.funcionarios = async(req, res) => {
  try {
    const funcionario = await Funcionario.findAll({ attributes: ["id", "nome", "sobrenome", "email", "cpf", "funcao", "ativo"] })
    if(!funcionario){
      return res.status(204)
    }

    return res.status(200).json(funcionario)
  } catch (error) {
    res.status(500).json({
      message: "Error!",
      error: error,
    });
  }
};

exports.deleteFuncionario = async (req, res) => {
  try {
    let {id} = req.params;
    let funcionario = await Funcionario.findByPk(id);

    if (!funcionario) {
      res.status(404).json({
        message: `Não existe nem um funcionario com o Id: ${id}`,
        error: "404",
      });
    } else {
      await funcionario.destroy();
      res.status(200).json("Funcionario deletado com sucesso.");
    }
  } catch (error) {
    res.status(500).json({
      message: `Error -> Não foi possível deletar o funcionario com o Id ${id}`,
      error: error.message,
    });
  }
};

exports.updateFuncionario = async (req, res) => {
  try {
    const {id, nome, sobrenome, email, funcao, ativo} = req.body
    let funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {
      res.status(404).json({
        message: `Não foi encontrado nem um funcionario com o id ${id}`,
        error: "404",
      });
    } else {

      let updatedObject = {
          nome: nome,
          sobrenome: sobrenome,
          email: email,
          ativo: ativo,
          funcao: funcao
      };

      let result = await Funcionario.update(updatedObject, {
        returning: true,
        where: { id: id },
        attributes: ["nome", "sobrenome", "ativo", "funcao"],
      });

      if (!result) {
        res.status(404).json({
          message: `Error -> Não houve alteração no funcionario id ${id}`,
          error: "Não pode ser alterado",
        });
      }

      res.status(200).json("Funcionario alterado com sucesso");
    }
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error,
    });
  }
};
