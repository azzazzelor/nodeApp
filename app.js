require('./config/db');
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const session = require('express-session'); 
const {passport} = require('./passport/passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const router = require('./routes/index');
const app = express();
 

app.use(logger(process.env.LOGGER_STR,));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({secret: process.env.SECRET_KEY,resave: true,saveUninitialized: true})); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', router);

// app.get('/logout',function(req,res){
//     req.logout();
//     res.send(null)
// })

app.listen(3000,()=>console.log('server statrted at port :3000'))