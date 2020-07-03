const router = require('express').Router()
const { checkAuth } = require('./helpers')

router.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard.hbs', { 
        title: 'Dashboard', 
        isLoading: true, 
        name: req.user.displayName,
        photo: req.user.image,
        user: req.user,
        jsPatch: 'dashboard.js',
        cssPath: 'profile.css',
        cssDashboardPath: 'dashboard.css',
        isAuthenticated: true
    })
})

module.exports = router