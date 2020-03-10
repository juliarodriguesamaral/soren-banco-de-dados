const Sequelize = require('sequelize');
const connection = require('../../database/database');
const Category = require('../categories/Category');

const Place = connection.define('places', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avaliacao: {
        type: Sequelize.INTEGER(5)
    }
});

Category.hasMany(Place);
Place.belongsTo(Category);

module.exports = Place;