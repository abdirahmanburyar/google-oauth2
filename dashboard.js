const router = require('express').Router()
const { checkAuth } = require('./helpers')

router.get('/dashboard', checkAuth, (req, res) => {
    console.log(req)
    res.render('dashboard.hbs', { title: 'Dashboard' , name: req.user.displayName, photo: req.user.image, user: req.user })
})

module.exports = router