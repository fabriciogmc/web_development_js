import { MariaDBDataSource } from "./data_source";
import {Projeto} from "./model";

export class Service{    
    start(){       
            MariaDBDataSource.initialize().then( ()=>{
                console.log("Inicializada a fonte de dados...");
            }).catch((err)=>{
                console.error("Erro de inicialização da fonte de dados!!");
            }) 
    }
    async insert(projeto: Projeto){
        await MariaDBDataSource.manager.save(projeto);        
    }
    async listAll(){
       let list = await MariaDBDataSource.manager.find(Projeto);
       return list;
    }
}

