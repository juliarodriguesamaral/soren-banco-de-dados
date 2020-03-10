const Sequelize = require('sequelize');

const connection = new Sequelize(
    {
        username: 'soren-root',
        password: 'recode2020',
        database: 'soren',
        host: 'mysql669.umbler.com',
        port: '41890',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;