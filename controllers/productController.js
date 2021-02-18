// CHANGE FILE/FOLDER NAMES

const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('../controllers/helpers/productHelper'); // валидатор за продукт

router.get('/', (req, res) => {
        res.redirect('/')
})
router.get('/create', (req, res) => {
        res.render('create', {title: 'Create a new offer'})
})
router.post('/create', (req, res) => {
    let dataToSend = {...req.body, creator: req.user._id};
        productService.createProduct(dataToSend)
            .then(createdShoe =>{
                    res.redirect('/')
            })
            .catch(err =>{
                res.render('create', {error:{message: err}})
            })
})

// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;