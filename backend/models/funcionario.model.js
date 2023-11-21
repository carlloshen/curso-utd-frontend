//Entidades
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { statusEnum, funcaoEnum } = require("../enums/enums");

module.exports = (sequelize) => {
  const Funcionario = sequelize.define(
    "funcionario",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4(),
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          len: [1,30]
        }
      },
      sobrenome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          len: [0,30]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        }
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [1, 11]
        },
      },
      ativo: {
        type: DataTypes.ENUM(...Object.values(statusEnum)),
        allowNull: false,
      },
      funcao: {
        type: DataTypes.ENUM(...Object.values(funcaoEnum)),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      /* timestamps: false, */
    }
  );

  return Funcionario;
};
