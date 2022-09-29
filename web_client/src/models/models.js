
class Projeto {
    constructor(id, titulo, tipo, tecnologia, inicio, fim){
        this.id= id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.tecnologia = tecnologia;
        this.inicio = inicio;
        this.fim = fim;
   }
}

module.exports = {
    Projeto: Projeto
}