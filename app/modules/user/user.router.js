const passport = require('passport');

const UserController = require('./userController');

module.exports = (app) => {
	app.get(
		'/', 
		UserController.root
	);
	app.post(
		'/',
		passport.authenticate('local', {
			failureFlash: true
		}),
		UserController.signin
	);
	app.post(
		'/signup',
		UserController.signup
	);
};