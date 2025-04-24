
const express = require('express');
const app = express();
const engine = require('express-handlebars').engine;
const bodyParser = require('body-parser');
const post = require('./Models/post');
const { where } = require('sequelize');




// Template engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get("/", function (req, res) {
    res.render("home")
});

app.get("/consulta", function (req, res) {
    post.findAll().then(function (posts) {
        res.render('consulta', { post: posts })
        console.log(posts)
    }).catch(function (erro) {
        res.send("Erro ao listar os post" + erro)
    })
});

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

app.get("/atualizar/:id", function(req,res){
    post.findAll({where:{id:req.params.id}}).then(function(post){
        res.render('atualizar',{post:post})
    }).catch(function(erro){
        res.send("Erro ao buscar o post" + erro)
    })
})

app.post("/atualizar/:id",function(req,res){
    post.update({  
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao,
    }, {where: {id: req.params.id}}).then(function () {
            res.send("Dados enviados com sucesso!");
        })
        .catch(function (erro) {
            res.send("Erro: Dados não enviados!" + erro);
        });
});

app.post("editar/:id",function(){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao,
        }, {where: {id: req.params.id}}).then(function () {
            res.redirect("/consulta")
        })
            .catch(function (erro) {
                res.send("Erro: Dados não enviados!" + erro);
                });
})

app.get("/excluir/:id", function(req,res){
    post.destroy({where:{id:req.params.id}}).then(function(){
        res.redirect("/consulta")
        }).catch(function(erro){
            res.send("Erro ao excluir o post" + erro)
            })
})
app.listen(8081, function () {
    console.log("rodando o meu express")
})


