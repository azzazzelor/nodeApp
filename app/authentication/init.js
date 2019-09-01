const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../modules/user/userModel');

const authenticationMiddleware = require('./middleware');

passport.serializeUser((user, next) => {
	next(null, user._id);
});

passport.deserializeUser((id, next) => {
	User.findById(id, next);
});

const initPassport = () => {
	passport.use(new LocalStrategy(
		{
            usernameField: 'email',    
            passwordField: 'password'
    	},
    	(email, password, next) => {
    		User.findOne({email}, (err, user) => {
    			if (err) {
	          		return next(err);
		        }

		        if (!user) {
		        	return next(null, false, { message: 'Incorrect username or password.' });
		        }

		        bcrypt.compare(password, user.password, (err, isValid) => {
					if (err) {
						return next(err);
					}

					if (!isValid) {
						return next(null, false, { message: 'Incorrect username or password.' });
					}

					return next(null, user);
		        });

    		});
    	}
	));

	passport.authenticationMiddleware = authenticationMiddleware;
};

module.exports = initPassport;