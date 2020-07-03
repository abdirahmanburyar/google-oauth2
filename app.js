const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const session = require('express-session')
const httpServer = require('http')
const MongoStore = require('connect-mongo')(session)
const exphbs = require('express-handlebars')
const app = express() 
const passport = require('passport')
const socket = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')

require('./passport')(passport)

const connectDB = require('./config/db')

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', partialsDir: 'views/partials'}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

connectDB()



app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
// app.use(function(req, res, next) {
//   res.locals.user = req.user;
//   console.log(req.user)
//   next()
// });

app.use('/', require('./route'))
app.use('/auth', require('./route'))
app.use('/', require('./dashboard'))

app.use(function(req, res){
  res.status(404).render('404.hbs', { url: req.headers.host + req.url, title: '404 Not Found' });
});

app.use(function(req, res){
  res.status(500).render('500.hbs', { url: req.headers.host + req.url, title: '404 Not Found' });
});



const server = httpServer.createServer(app)
const io = socket(server)

io.on('connection', socket => {
  console.log('new user connected..'+ socket.id)
})

server.listen(5000, console.log(`server is running ${process.env.NODE_ENV} on port 5000`))
