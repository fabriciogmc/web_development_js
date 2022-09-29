/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

/* importando o modelo */
import { Projeto} from "./models/Projeto"
/* importanto o data source inicializado */
import { MariaDBDataSource} from "./data_source"


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './src/views'); //Referência a partir do ponto de execução, fora de src

/* Configuração para leitura de parâmetros em requisição do tipo post em form */
app.use(bodyParser.urlencoded({extended: false}));

/* Inicializando a fonte de dados: */
MariaDBDataSource.initialize().then( ()=>{
    console.log("Inicializada a fonte de dados...");
}).catch((err)=>{
    console.error("Erro de inicialização da fonte de dados");
}) 


/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('public'));

app.get('/', listProjectHandler);

app.get('/adicionarProjetoForm', addProjectHandlerForm);

app.post('/adicionarProjeto', addProjectHandler);

app.listen(port, listenHandler);

/* Função que gera o formulário para adição de um projeto*/
function addProjectHandlerForm(req,res){
    res.render('adicionar_projeto_form.ejs'); 
}

/* Função que efetivamente adiciona um projeto. */
function addProjectHandler(req,res){
    let novo_projeto = new Projeto();    
    novo_projeto.titulo = req.body.titulo;
    novo_projeto.tecnologia = req.body.tecnologia;
    novo_projeto.tipo = req.body.tipo;
    novo_projeto.inicio = req.body.inicio;
    novo_projeto.fim = req.body.fim;    
    MariaDBDataSource.manager.save(novo_projeto);
    res.render('adicionar_projeto_confirm.ejs', {projeto: novo_projeto}); 
}


async function listProjectHandler(req, res){
    /* dados vindos diretamente do banco de dados */
    let projetos = await MariaDBDataSource.manager.find(Projeto);  
    console.log(projetos);
    res.render('listar_projetos.ejs',{lista_projetos: projetos});    
}

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}