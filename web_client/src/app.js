/*
Exemplo de cliente simples que consome dados de um
serviço de persistência (leitura de dados)
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express')

/* importando o componente para criação das requests (get)*/
const request = require('request');
const app = express();
const port = 5002;

/* importando o modelo */
const modelo = require('./models/models');
var Projeto = modelo.Projeto; //Vinculação de tipo



/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './src/views'); //Referência a partir do ponto de execução, fora de src


/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('public'));

app.get('/', listProjectHandler);

app.listen(port, listenHandler);

/* Tratador para as requisições de listagens*/
function listProjectHandler(req, resp){
    /* aqui os dados são solicitados a partir do serviço */
    console.log("Efetuando a request ao serviço.");
    let projetos = [];
    request('http://localhost:5001/list', 
            { json: true }, (err, res, body) => {
                if (err) { 
                    return console.log(err); 
                } else {
                    /* build project list: */
                    res.body.forEach((item)=>{
                        let projeto = new Projeto(item.id, item.tipo, item.tecnologia,
                                                 item.inicio, item.fim);
                        projetos.push(projeto);
                    }); 
                    resp.render('listar_projetos',{lista_projetos: projetos});                    
                }               
            });    
}

/* Tratador para inicializar a aplicação (escutar as requisições)*/
function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}