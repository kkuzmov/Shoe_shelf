// CHECK NAMES!!!

const { Router } = require('express');


const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.get('*', (req, res)=>{
    res.render('404')
})

module.exports = router;


// ВНИМАВАЙ С PATHNAMES!!