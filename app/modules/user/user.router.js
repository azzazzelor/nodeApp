const passport = require('passport');

const UserController = require('./userController');

module.exports = (app) => {
	app.get('/',
		passport.authenticationMiddleware(),
		UserController.root
	);

	app.post('/signin',
		passport.authenticate('local',{
			failureFlash: true,
			failureRedirect: '/'
		}),
		UserController.signin
	);

	app.get('/auth/facebook',
		passport.authenticate('facebook',{
			scope : ['public_profile', 'email']
		})
	);

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook',{
			failureRedirect: '/'
		}),
		UserController.signin
	);

	app.get('/auth/google',
		passport.authenticate('google', {
			scope : ['profile', 'email']
		})
	);

	app.get('/auth/google/callback',
		passport.authenticate('google',	{
			failureRedirect: '/'
		}),
		UserController.signin
	);

	app.post('/signup',
		UserController.signup
	);

	app.post(
        '/updateUserLocation',
        UserController.updateLocationUser
	);
	
	app.post(
		'/allNearest/:type',
		UserController.allNearest
	)
};