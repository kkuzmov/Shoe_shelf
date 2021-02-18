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
router.get('/create', isAuthenticated, (req, res) => {
        res.render('create', {title: 'Create a new offer'})
})
router.post('/create', isAuthenticated,(req, res) => {
    let dataToSend = {...req.body, creator: req.user._id};
        productService.createProduct(dataToSend)
            .then(createdShoe =>{
                    res.redirect('/')
            })
            .catch(err =>{
                res.render('create', {error:{message: err}})
            })
})
router.get('/:productId/details', isAuthenticated, (req, res)=>{
        productService.getOne(req.params.productId)
           .then(shoe =>{
                let isCreator = req.user._id === shoe.creator;
                let isBought = shoe.buyers.includes(req.user._id);
                res.render('details', {title: 'Product details', shoe, isCreator, isBought})
           })
})
router.get('/:productId/edit', isAuthenticated,(req, res)=>{
        productService.getOne(req.params.productId)
           .then(shoe =>{
                res.render('edit', {title: 'Product details', shoe})
           })
})
router.post('/:productId/edit', isAuthenticated, (req, res)=>{
        let dataToSend = req.body;
        productService.updateOne(req.params.productId, dataToSend)
           .then(shoe =>{
                res.redirect(`/products/${req.params.productId}/details`);
           })
})
router.get('/:productId/buy', isAuthenticated, (req, res)=>{
        productService.getOne(req.params.productId)
           .then(shoe =>{
                let user = req.user;
                let buyers = shoe.buyers;
                buyers.push(user._id);
                productService.updateOne(req.params.productId, {...shoe, buyers}) 
                        .then(responseFromUpdate =>{
                                res.redirect(`/products/${req.params.productId}/details`);
                        })
           })
})
router.get('/:productId/delete',isAuthenticated, (req, res)=>{
        productService.deleteOne(req.params.productId)
           .then(deleted =>{
                res.redirect('/');
           })
})

// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;