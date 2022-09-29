/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

/* Em uma mesma máquina, aplicações web diferentes devem ser executadas
em portas diferentes.*/
const port = 5001;

/* importando o modelo */
import { Projeto} from "./models/Projeto"
/* importanto o data source inicializado */
import { MariaDBDataSource} from "./data_source"



/* Configuração para leitura de parâmetros em requisição do tipo post em form */
app.use(bodyParser.urlencoded({extended: false}));
/* Habilitação de requisições partindo de outras aplicações */
app.use(cors({
    oringin: '*',
    credentials: true
})); 

/* Inicializando a fonte de dados: */
MariaDBDataSource.initialize().then( ()=>{
    console.log("Inicializada a fonte de dados...");
}).catch((err)=>{
    console.error("Erro de inicialização da fonte de dados");
}) 



app.get('/list', listProjectHandler);
app.post('/add', addProjectHandler);


app.listen(port, listenHandler);

/* Tratadores de requisição */

/* Tratador de listagem */
async function listProjectHandler(req, res){
    /* dados vindos diretamente do banco de dados */
    console.log("Requisição de listagem recebida.");
    let projetos = await MariaDBDataSource.manager.find(Projeto);  
    let json_prj_list = JSON.stringify(projetos);
    res.setHeader('Content-Type', 'application/json');
    res.end(json_prj_list);     
}

/* Tratador de adição */
async function addProjectHandler(req,res){
    console.log("Requisição de inserção recebida");
    let novo_projeto = new Projeto();    
    novo_projeto.titulo =  req.body.titulo;
    novo_projeto.tecnologia = req.body.tecnologia;
    novo_projeto.tipo =  req.body.tipo;
    novo_projeto.inicio = req.body.inicio;
    novo_projeto.fim = req.body.fim;   
    console.log('Parâmetros de requisição lidos.');
    console.log(novo_projeto.titulo);    
    await MariaDBDataSource.manager.save(novo_projeto);
    let novo_projeto_i = JSON.stringify(novo_projeto);
    res.setHeader('Content-Type', 'application/json');
    res.end(novo_projeto_i);     
}


function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}