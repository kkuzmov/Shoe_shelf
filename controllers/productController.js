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
router.get('/:productId/details', (req, res)=>{
        productService.getOne(req.params.productId)
           .then(shoe =>{
                let isCreator = req.user._id === shoe.creator;
                res.render('details', {title: 'Product details', shoe, isCreator})
           })
})
router.get('/:productId/edit', (req, res)=>{
        productService.getOne(req.params.productId)
           .then(shoe =>{
                res.render('edit', {title: 'Product details', shoe})
           })
})
router.post('/:productId/edit', (req, res)=>{
        let dataToSend = req.body;
        productService.updateOne(req.params.productId, dataToSend)
           .then(shoe =>{
                res.redirect(`/products/${req.params.productId}/details`);
           })
})

// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;