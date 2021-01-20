const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./database/database');

const EmployeeController = require('./employee/employeeController');
const PatrimonyController = require('./patrimony/patrimonyController');
const UsersController = require('./users/UsersController');

const EmployeeModel = require('./employee/employeeModel');
const PatrimonyModal = require('./patrimony/patrimonyModel');
const UsersModel = require('./users/UsersModel');


// View engine
app.set('view engine', 'ejs');

// Session
app.use(session({
    secret: 'Pp{)9f>Rr2WXxMbY<R', cookie: { maxAge: 7200000 }
}))


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

app.use('/', EmployeeController);
app.use('/', PatrimonyController);
app.use('/', UsersController);

app.get('/', (req, res) => {
    EmployeeModel.findAll({
        include: [{ model: PatrimonyModal }],
        order: [['id', 'DESC']],
        limit: 6
    }).then(employess => {
        res.render('index', { employess })
    })
});

// app.get('/description/:id', (req, res) => {
//     let id = req.params.id;

//     if (isNaN(id)) {
//         res.redirect('/')
//     }

//     PatrimonyModal.findOne({
//         where: {
//             employeeId: id
//         },
//         include: [{ model: EmployeeModel }]
//     }).then(patrimonies => {
//         if (patrimonies != undefined) {
//             res.render('patrimonies', { patrimonies })
//         } else {
//             res.redirect('/')
//         }
//     }).catch(error => {
//         res.redirect('/')
//     })
// })

app.get('/patrimonios/all/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id)) {
        res.redirect('/')
    }

    PatrimonyModal.findAll({
        where: {
            employeeId: id
        }
    }).then(patrimonios => {
        if (patrimonios != undefined) {
            res.render('patrimonies', { patrimonios })
        }
    })
})

// Servidor
app.listen(3001, () => {
    console.log('Servidor UP!');
});