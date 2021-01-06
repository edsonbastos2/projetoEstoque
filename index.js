const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const EmployeeController = require('./employee/employeeController');
const PatrimonyController = require('./patrimony/patrimonyController');

const EmployeeModel = require('./employee/employeeModel');
const PatrimonyModal = require('./patrimony/patrimonyModel');


// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

app.use('/', EmployeeController);
app.use('/', PatrimonyController);

// Servidor
app.listen(3001, () => {
    console.log('Servidor UP!');
});