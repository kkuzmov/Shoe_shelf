//CHECKED!!!
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Home'});
})

module.exports = router


// HOME CONTROLLER - ЗАРЕЖДА HOME И ABOUT PAGES
// ЧАСТ ОТ EXAM PACKAGE