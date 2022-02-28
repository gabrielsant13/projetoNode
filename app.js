const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')
const admin = require("./routes/admin")
const { application } = require("express")


//config
    //Template Engine
        //com essas 2 linhas de codigo abaixo estamos dizendo pro express que queremos utilizar o template engine no projeto
        app.engine("handlebars", handlebars.engine({defaultLayout: 'main'}))
        app.set("view engine", "handlebars")
    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
    

//rotas

app.use("/admin", admin)


    app.get('/', function(req,res){
        //{order: [['id', 'DESC']]} > tras os posts em ordem decrescente, para ordem crescente ASC
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            //com esse {posts: posts} eu consigo passar qualquer tipo de dado para o handlebars
            //a variavel local posts recebe a variavel posts que ta vindo do then
            res.render('home', {posts: posts})
        })
        
    })


    app.get('/deletar/:id', function(req,res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.redirect('/').catch(function(erro){
                res.send("ID nao encontrado")
            })
        })
    })


    app.get('/editar/:id', function(req, res){
        Post.findByPk(req.params.id)
          .then(post => {
            res.render('editar', {
              id: req.params.id,
              titulo: post.titulo,
              conteudo: post.conteudo
            })
          })
          .catch(err => {
            res.send('Post não encontrado!')
          })
      })


      app.post('/editado/:id', function(req, res){
        Post.update({
          titulo: req.body.titulo,
          conteudo: req.body.conteudo
        },
        {
          where: { id: req.params.id }
        }).then(function(){
          res.redirect('/')
        }).catch(function(err){
          console.log(err);
        })
      })
      
    
    app.get('/cadastro', function(req,res){
        res.render('formulario')
    })

    
    app.post('/confirmacao', function(req,res){
        //adicionando as variaveis no banco
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            //caso tenha cadastrado com sucesso, irá ser redirecionado para a rota principal "home"
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro na tentativa de criação: " + erro)
        })

        
    })


app.listen(5555, () => {
    console.log("Servidor rodando na url http://localhost:5555")
})