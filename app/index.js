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
const server = require("http").Server(app);
const io = require('socket.io').listen(server);

// socketEvents = require('../config/socketEvents');  
// socketEvents(io); 

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


const arr = [];

io.sockets.on('connection', (socket) => {
	socket.on('storeClientInfo',(data) => {
			let clientInfo = new Object();
            clientInfo.customId = data.customId;
            clientInfo.clientId = socket.id;
            clients.push(clientInfo);
	})

	
	socket.on('disconnect', (socket) => {
		for( let i=0, len=clients.length; i<len; ++i ){
			let c = clients[i];

			if(c.clientId == socket.id){
				clients.splice(i,1);
				break;
			}
		}
	})
})





config.loader(app);



module.exports = app;
