const express = require('express');
const router = express.Router();
const employee = require('./employeeModel');

router.get('/admin/funcionarios', (req, res) => {
    res.render('admin/employee/employee');
});

router.post('/funcionario/save', (req, res) => {
    let nome = req.body.nome;
    let funcao = req.body.funcao;
    let posto = req.body.posto;
    let setor = req.body.setor;

    if (nome != undefined && setor != undefined) {
        employee.create({
            nome,
            funcao,
            posto,
            setor
        }).then(() => {
            res.redirect('/')
        })
    } else {
        res.redirect('/admin/funcionarios');
    }
})

router.get('/admin/employees', (req, res) => {
    employee.findAll().then(employees => {
        res.render('admin/employee/index', {
            employees
        })
    })
});

router.post('/employees/delete', (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            employee.destroy({
                where: {
                    id: id
                }
            }).then(() => res.redirect('/admin/employees'))
        } else {
            res.redirect('/admin/employees')
        }
    } else {
        res.redirect('/admin/employess')
    }
})

module.exports = router;