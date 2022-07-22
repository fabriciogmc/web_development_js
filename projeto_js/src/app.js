/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express')
const app = express();
const port = 5000;

/* importando o modelo */
const modelo = require('./models/modelos');
var Bandeira = modelo.Bandeira; //Vinculação de tipo


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './views');

/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('public'));

app.get('/', getRootHandler);

app.listen(port, listenHandler);

function getRootHandler(req, res){
    let bandeira_1 = new Bandeira("Brasil"); 
    res.render('home.ejs', {pais:bandeira_1.pais});    
}

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}