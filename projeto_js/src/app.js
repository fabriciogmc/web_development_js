/*
This example shows how to handle a request that
has a query string and templates.

Author: Fabrício G. M. de Carvalho, Ph.D
*/


const express = require('express')
const app = express();
const port = 5000;


/* Configuring the template engine: */
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', getRootHandler);

app.listen(port, listenHandler);

function getRootHandler(req, res){
    res.render('home.ejs');    
}

function listenHandler(){
    console.log(`Listening on port ${port}!`);
}