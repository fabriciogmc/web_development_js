/*
Exemplo de aplicação com persistência para console
Utiliza-se, nesse caso, uma cadeia de promessas 
(promises). Uma vez resolvida, na inicialização
dos dados, pode-se efetuar a inserção.

Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */


const port = 5000;

/* importando o modelo */
import { Projeto } from "./models/model"

/* importanto o data source inicializado */
import {Service} from "./models/services";

/* Inicializando a fonte de dados: */
var service = new Service();

service.start().then(()=>{
    console.log("Agora a inserção pode ser feita");
    let novo_projeto = new Projeto();    
    novo_projeto.titulo = "Iniciação Científica";
    novo_projeto.tecnologia = "JavaScript";
    novo_projeto.tipo = "Desenvolvimento tecnológico";
    novo_projeto.inicio = "01/10/2023"
    novo_projeto.fim = "30/10/2025"  
    service.insert(novo_projeto);
});

