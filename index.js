const App = require('./app');
const PORT = +process.env.PORT || 8080;

App.listen(PORT, (err) => {
	if (err) {
		throw err;
	}

	console.log("\x1b[32m", `Server started at port: ${PORT}`, "\x1b[37m");
});