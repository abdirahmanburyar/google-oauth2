const router = require('express').Router()

router.get('/500', checkIsAuth, (req, res) => {
    res.render('500.hbs', { data: 'Something Went Wrong!!'})
})