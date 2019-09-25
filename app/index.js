require('dotenv').config();

const config = require('../config');

const express = require('express');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');


const TYPE = process.env.LOGGER_STR || "tiny";
const SECRET = process.env.SECRET_KEY || "dev-secret";

const app = express();

require('./authentication').init(app);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(fileUpload({
	useTempFiles: true
}));

app.use(logger(TYPE));
app.use(flash());
app.use(cookieParser());
app.use(session({
	secret: SECRET,
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

config.loader(app);

module.exports = app;
