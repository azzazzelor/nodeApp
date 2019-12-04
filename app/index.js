require('dotenv').config();

const config = require('../config');

const express = require('express');
const passport = require('passport');
const logger = require('morgan');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const session = require('cookie-session');

const TYPE = process.env.LOGGER_STR || "tiny";
const SECRET = process.env.SECRET_KEY || "dev-secret";

const app = express();
/* 
	deleate in main index file js listener
// const server = require("http").Server(app);
// const io = require('socket.io').listen(server);   
*/
const server = app.listen(process.env.PORT || 5000); 
const io = require('socket.io').listen(server);   /// make changes for android socket 

// socketEvents = require('../config/socketEvents');  
// socketEvents(io); // can pass app , in file we can 

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

const clients = [];

io.sockets.on('connection', (socket) => {
	console.log(socket)
	socket.on('storeClientInfo',(data) => {
			let clientInfo = new Object();
            clientInfo.customId = data.customId;
            clientInfo.clientId = socket.id;
			clients.push(clientInfo);
			console.log(clients)
	})


	socket.on('disconnect', (socket) => {
		console.log('disconnect')
		// clients.map(el => {
		// 	if(el.clientId === socket.id){
		// 		let index = 
		// 		clients.splice()
		// 	}
		// })
		for( let i=0, len=clients.length; i<len; ++i ){
			let c = clients[i];
			console.log(c)
			// if(c.clientId === socket.id){
			// 	console.log('splice')
			// 	clients.splice(i,1);
			// 	break;
			// }
		}
	})
})


app.use('/getOnline', (req,res) =>{
	res.send(clients)
})


config.loader(app);



module.exports = app;
