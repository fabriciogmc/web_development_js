import "reflect-metadata"
import { DataSource } from "typeorm"
import { Projeto} from "./model"

export const MariaDBDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "console_orm",
    synchronize: true,
    logging: false,
    entities: [Projeto],
    migrations: [],
    subscribers: [],
})

export async function dataSourceStart(){
    return MariaDBDataSource.initialize().then( ()=>{
        console.log("Inicializada a fonte de dados...");
    }).catch((err)=>{
        console.error("Erro de inicialização da fonte de dados");
     }); 
}