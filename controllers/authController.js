const { Router } = require('express');
const authService = require('../services/authService');
const router = Router();
const { COOKIE_NAME } = require('../config/config');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

//ВНИМАВАЙ С PATHNAMES - ПРОМЕНИ ГИ В ПАПКА VIEWS СЛЕД КАТО ГИ ПОЛУЧИШ!!!


//ВТОРИЯТ ПАРАМЕТЪР НА .GET Е MIDDLEWARE - ВНИМАВАЙ ДАЛИ ГО ИЗПОЛЗВАШ!

router.get('/login',(req, res) => {
    res.render('login');
})
router.post('/login',async (req, res)=>{
    const {email, password} = req.body;

    try {
        let token = await authService.login({email, password})

        res.cookie(COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/products')
    } catch (error) {
        res.status(404).render('login', {error});
    }
})
router.get('/register', (req, res) => {
    res.render('register', {title: 'Register user'})
})
router.post('/register', async (req, res) => {
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
router.get('/logout', (req, res)=>{
    res.clearCookie(COOKIE_NAME);
    res.redirect('/')
})
router.get('/profile', (req, res)=>{
    res.render('profile', {title: 'Profile'})
})
module.exports = router;