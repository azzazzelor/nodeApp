const express = require('express');

const logger = require('morgan');

const  session = require('express-session');
 
 const {mongoose} = require('./config/db');

 const {passport} = require('./passport/passport');
 
 const cookieParser = require('cookie-parser');
 
 const app = express();
 
 app.use(logger('dev'));

 app.use(express.json());

 app.use(express.urlencoded());

 app.use(cookieParser());

 app.use(session({secret: 'mySecretKey',resave: true,
 saveUninitialized: true})); 
 
 app.use(passport.initialize());
 
 app.use(passport.session());

 const flash = require('connect-flash');

 app.use(flash());

const router = require('./routes/index')
app.use('/', router)

// app.get('/logout',function(req,res){
//     req.logout();
//     res.send(null)
// })

 app.listen(3000,()=>console.log('server statrted at port :3000'))