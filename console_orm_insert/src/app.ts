/*
Exemplo simples de sistema monolítico com persistência (listagem e inserção)
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

setTimeout(inserir, 10000); // em milissegundos
service.start();
function inserir(){
    let novo_projeto = new Projeto();    
    novo_projeto.titulo = "Iniciação Científica";
    novo_projeto.tecnologia = "JavaScript";
    novo_projeto.tipo = "Desenvolvimento tecnológico";
    novo_projeto.inicio = "01/10/2022"
    novo_projeto.fim = "30/10/2023"  
    service.insert(novo_projeto);
    console.log("Agora a inserção pode ser feita");
}




