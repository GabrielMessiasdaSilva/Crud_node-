const Sequelize = require('sequelize');
const sequelize = new Sequelize('ProjetoWeb', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize: sequelize
}

//é legal inverter o "apelidos" pois podemos usar

