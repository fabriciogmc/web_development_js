/* Script simples para adicionar uma função a um botão.
Autor: Fabrício Galende Marques de Carvalho.
*/
window.onload = function(){
    var botao = document.getElementById('bot_01');
    botao.onclick = function(){
        var div_vazia = document.getElementById('div_01');
        div_vazia.textContent = "Você clicou!";
    };
}