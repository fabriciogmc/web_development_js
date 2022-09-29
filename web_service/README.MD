# Um serviço web simples para inserção e listagem de itens em um banco de dados relacional (MariaDB/MySQL). Utiliza o framework TypeORM.

# Autor: Fabrício G. M. de Carvalho, Ph. D

Para executar o sistema:

1. Execute o servidor de banco de dados localmente e crie uma base de dados denominada web_orm_insert_ts.
1. No arquivo denominado src/models/data_source.ts, verifique as configurações das credenciais, porta de execução, etc  de acordo com o SGBD em execução.
1. Na raiz do projeto, fora da pasta src/, execute os comandos:
```console
    npm install
```
```console
    npm start
``` 
1. Espere aparecer a mensagem informando que a fonte de dados foi inicializada.
1. Acessar http://localhost:5001/ e verificar se está retornando um JSON correspondente às entradas presentes no banco de dados.
1. Utilizar um programa tal como Postman, criar uma requisição do tipo POST enviada no corpo (body) da requisição, formato x-www-form-urlencoded com valores para titulo, tecnologia, tipo, inicio e fim.
1. Acessar novamente http://localhost:5001/ e verificar se o projeto inserido está sendo retornado como JSON.