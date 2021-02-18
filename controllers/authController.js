const { Router } = require('express');
const authService = require('../services/authService');
const router = Router();
const { COOKIE_NAME } = require('../config/config');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const productService = require('../services/productService');

//ВНИМАВАЙ С PATHNAMES - ПРОМЕНИ ГИ В ПАПКА VIEWS СЛЕД КАТО ГИ ПОЛУЧИШ!!!


//ВТОРИЯТ ПАРАМЕТЪР НА .GET Е MIDDLEWARE - ВНИМАВАЙ ДАЛИ ГО ИЗПОЛЗВАШ!

router.get('/login', isGuest, (req, res) => {
    res.render('login');
})
router.post('/login', isGuest, async (req, res)=>{
    const {email, password} = req.body;

    try {
        let token = await authService.login({email, password})

        res.cookie(COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/products')
    } catch (error) {
        res.status(404).render('login', {error});
    }
})
router.get('/register', isGuest,  (req, res) => {
    res.render('register', {title: 'Register user'})
})
router.post('/register', isGuest,  async (req, res) => {
    const {email, fullName, password, rePassword} = req.body;
    if(password !== rePassword){
        res.status(401).render('register', {error:{message: 'Passwords do not match!'}});
        return;
    }
    try {
        let user = await authService.register({email, fullName, password});
    try {
        let token = await authService.login({email, password})
        res.cookie(COOKIE_NAME, token);
        res.redirect('/')
    } catch (error) {
        res.status(404).render('login', {error})
    } 
} catch (error) {
        res.status(404).render('register', {error: {message: error.errors.password.properties.message}})
        return;
}
})
router.get('/logout', isAuthenticated,  (req, res)=>{
    res.clearCookie(COOKIE_NAME);
    res.redirect('/')
})
router.get('/profile', isAuthenticated, (req, res)=>{
    let result = 0;
    productService.getAll()
        .then(shoes =>{
            let email = req.user.email;
            shoes = shoes.filter(shoe => shoe.buyers.includes(req.user._id));
            shoes.forEach(shoe => {
                result += shoe.price
            });
            res.render('profile', {title: 'Profile', shoes, result, email})

        })
})
module.exports = router;