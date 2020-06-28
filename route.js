const router = require('express').Router()
const passport = require('passport')
const { checkIsAuth } = require('./helpers')
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/', checkIsAuth, (req, res) => {
    res.render('index.hbs', { title: 'Login'})
})

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/dashboard')
    }
  )
  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

module.exports = router