class Usuario{
    constructor(nome, telefones){
        this.nome = nome;
        this.id = 1;
        this.telefones = telefones;
    }
}

class Telefone{
    constructor(ddd, numero){
        this.ddd = ddd;
        this.numero = numero;
    }
}

module.exports = {
    Usuario: Usuario,
    Telefone: Telefone
}  





