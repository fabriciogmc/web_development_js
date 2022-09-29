
class Projeto {
    constructor(id, titulo, tipo, tecnologia, inicio, fim){
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.tecnologia = tecnologia;
        this.inicio = inicio;
        this.fim = fim;
   }
    /* Utilizado para possível validação e não inserção de projetos
      com campos vazios.*/
    validateProject(){
        let prop = Object.getOwnPropertyNames(this);        
        for(let i=0; i< prop.length; ++i){
            if(prop[i]!='id' && this[prop[i]]==''){
                return false;
            }
        }
        return true;     
   }
}

module.exports = {
    Projeto: Projeto
}