import { MariaDBDataSource, dataSourceStart } from "./data_source";
import {Projeto} from "./model";

export class Service{    
    start(){
        dataSourceStart();
    }
    insert(projeto: Projeto){
        MariaDBDataSource.manager.save(projeto);
        return projeto;
    }
    async listAll(){
       let list = await MariaDBDataSource.manager.find(Projeto);
       return list;
    }
}

