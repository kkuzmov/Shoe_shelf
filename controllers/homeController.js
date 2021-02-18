//CHECKED!!!
const { Router } = require('express');
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll()
        .then(shoes =>{
            res.render('home', {title: 'Home', shoes});
        })
})

module.exports = router


// HOME CONTROLLER - ЗАРЕЖДА HOME И ABOUT PAGES
// ЧАСТ ОТ EXAM PACKAGE