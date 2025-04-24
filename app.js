
const express = require('express');
const app = express();
const engine = require('express-handlebars').engine;
const bodyParser = require('body-parser');
const post = require('./Models/post');
const { where } = require('sequelize');
const handlebarsHelper = require("handlebars");





// Template engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get("/", function (req, res) {
    res.render("home")
});

app.get("/consulta", function (req, res) {
    post.findAll().then(function (post) {
        res.render("consulta", { post })
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})


app.post("/cadastrar", function (req, res) {
    post
        .create({
            nome: req.body.nome,
            telefone: req.body.telefone,
            origem: req.body.origem,
            data_contato: req.body.data_contato,
            observacao: req.body.observacao,
        })
        .then(function () {
            res.redirect("/consulta")
        })
        .catch(function (erro) {
            res.send("Erro: Dados não enviados!" + erro);
        });
});



app.get("/excluir/:id", function(req, res){
    post.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect("/consulta");
    }).catch(function(erro){
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})



app.get("/editar/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then(function(post){
        res.render("editar", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})
app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/consulta")
    })
})



handlebarsHelper.registerHelper("eq", function (a, b) {
    return a === b;
});

app.listen(8081, function () {
    console.log("rodando o meu express")
})


