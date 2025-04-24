const db = require('./banco') //estamos importando um arquivo que criamos o banco.js

const Agendamentos = db.sequelize.define('agendamentos',{
    nome:{
        type:db.Sequelize.STRING,
    },
    telefone:{
        type:db.Sequelize.STRING,
    },
    origem:{
        type:db.Sequelize.STRING,
    },
    data_contato:{
        type:db.Sequelize.DATE
    },
    observacao:{
        type:db.Sequelize.STRING
    }
}); //estamos acessando o modelo Agendamentos do banco de dados

//Agendamentos.sync({force:true})

module.exports = Agendamentos