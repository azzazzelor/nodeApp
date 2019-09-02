const passport = require('passport');

const UserController = require('./userController');

module.exports = (app) => {
	app.get(
		'/',
		UserController.root
	);
	app.post(
		'/',
		passport.authenticate(
			'local',
			{
				failureFlash: true,
				failureRedirect: '/'
			}
		),
		UserController.signin
	);
	app.post(
		'/signup',
		UserController.signup
	);

	app.get(
		'/auth/facebook',
		passport.authenticate(
			'facebook',
			{ scope : ['public_profile', 'email'] }
		)
	);

	app.get(
		'/auth/facebook/callback',
		passport.authenticate(
			'facebook',
			{
				failureRedirect : '/'
			}
		),
		UserController.signin
	);

	app.get(
		'/auth/google',
		passport.authenticate(
			'google'
		)
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate(
			'google',
			{
				failureRedirect : '/'
			}
		),
		UserController.signin
	);
};