
window.onload = function(){
    var body = document.getElementsByTagName('body');
    console.log(body);
    var paragraph = document.createElement('p');
    body[0].appendChild(paragraph);
    paragraph.textContent = "Olá JS!";
}