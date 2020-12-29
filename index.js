const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');


// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'))

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco');
    }).catch(error => {
        console.log(error)
    })

// Routers
app.get('/', (req, res) => {
    res.render('index')
});


// Servidor
app.listen(3001, () => {
    console.log('Servidor UP!');
});