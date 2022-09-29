/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express')
/* importando componente para ler corpo de requisições do tipo body */

const bodyParser = require('body-parser');

const app = express();
const port = 5003;

/* importando o módulo para gerar as requisições: request e urllib */
var request = require('request');
/* importando o modelo */
const modelo = require('./models/models');
var Projeto = modelo.Projeto; //Vinculação de tipo


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './src/views'); //Referência a partir do ponto de execução, fora de src

/* Configuração para leitura de parâmetros em requisição do tipo post em form */
app.use(bodyParser.urlencoded({extended: false}));


/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('src/public'));

app.get('/', listProjectHandler);

app.get('/addForm', addProjectHandlerForm);

app.post('/add', addProjectHandler);

app.listen(port, listenHandler);

/* Função que gera o formulário para adição de um projeto*/
function addProjectHandlerForm(req,res){
    res.render('adicionar_projeto_form.ejs'); 
}

/* Função que efetivamente adiciona um projeto. */
async function addProjectHandler(req,res){
    var prj_data_i = {
        'titulo': req.body.titulo,
        'tipo': req.body.tipo,
        'tecnologia': req.body.tecnologia,
        'inicio': req.body.inicio,
        'fim':req.body.fim 
    }   
    let p = new Projeto(); 
    for(const property in prj_data_i){
        p[property] = prj_data_i[property];        
    } 
    console.log("O projeto é:", p.validateProject());
    
    request.post({url:'http://localhost:5001/add', 
                form: prj_data_i}, 
                function(err,httpResponse,body){
                proj_json = JSON.parse(httpResponse.body);                              
                var projeto_out = new Projeto(proj_json.id,
                    proj_json.titulo,
                    proj_json.tipo,
                    proj_json.tecnologia,
                    proj_json.inicio,
                    proj_json.fim);                           
                res.render('adicionar_projeto_confirm.ejs', {projeto: projeto_out}); 
    });      
}

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
                        let projeto = new Projeto(item.id, item.titulo, item.tipo, 
                                                  item.tecnologia, item.inicio, item.fim);
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