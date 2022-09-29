/*
Exemplo simples de uma estrutura MVC sem persistência de dados,
com dados
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express');
const app = express();
const port = 5000;

/* importando o modelo */
const modelo = require('./models/modelos');
var Usuario = modelo.Usuario; //Vinculação de tipo
var Telefone = modelo.Telefone;


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './src/views');

/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('src/public'));

app.get('/', getRootHandler);

app.listen(port, listenHandler);

function getRootHandler(req, res){
    /* Criando um objeto contendo uma associação entre 2 objetos */
    /* Essa associação apareceria potencialmente em 3 tabelas em um
    ** banco de dados: tabelas usuario, telefone e usuario_telefone */
    let usuario_1 = new Usuario("Fabrício GMC"); 
    let telefones = [new Telefone("012", "11111111"), new Telefone("011", "22222222")];
    usuario_1.telefones = telefones;    
    res.render('home.ejs', {usuario:usuario_1});    
}

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}