const express = require('express');
const router = express.Router();

router.get('/patrimonios', (req, res) => {
    res.send('Rota dos patrimonios');
});

module.exports = router;