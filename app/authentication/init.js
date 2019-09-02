const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt');

const User = require('../modules/user/userModel');

const authenticationMiddleware = require('./middleware');

const initPassport = () => {

	passport.serializeUser((user, next) => {
		next(null, user._id);
	});

	passport.deserializeUser((id, next) => {
		User.findById(id, next);
	});

	/**
	 * Init local strategy
	 */
	passport.use('local', new LocalStrategy(
		{
            usernameField: 'email',    
            passwordField: 'password',
			passReqToCallback : true
    	},
    	(req, email, password, next) => {
			if (email)
				email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    		User.findOne({email}, (err, user) => {
    			if (err) {
	          		return next(err);
		        }

		        if (!user) {
		        	return next(null, false, req.flash('loginMessage', 'Incorrect username or password.'));
		        }

		        bcrypt.compare(password, user.password, (err, isValid) => {

					if (err) {
						return next(err);
					}

					if (!isValid) {
						return next(null, false, req.flash('loginMessage', 'Incorrect username or password.'));
					}

					return next(null, user);
		        });

    		});
    	}
	));

	/**
	 * Init facebook strategy
	 */
	passport.use('facebook', new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK,
			passReqToCallback : true
		},
		(req, accessToken, refreshToken, profile, next) => {
			process.nextTick(() => {
				console.log(profile.id);
				User.findOne({ 'facebook.id' : profile.id }, (err, user) => {
					if (err) {
						return next(err);
					}

					if (!user) {
						return next(null, false, req.flash('facebookError', 'User are not exist.'));
					}

					// if there is a user id already but no token (user was linked at one point and then removed)
					if (!user.facebook.token) {
						user.facebook.token = accessToken;
						user.facebook.firstName  = profile.name.givenName;
						user.facebook.lastName = profile.name.familyName;
						//user.facebook.email = (profile.emails[0].value || '').toLowerCase();

						user.save(function(err) {
							if (err)
								return next(err);

							return next(null, user);
						});
					}

					return next(null, user); // user found, return that user

				});
			});
		}
	));

 /**
	 * Init google strategy
	 */
    passport.use('google', new GoogleStrategy(
	    {
	        clientID        : process.env.GOOGLE_APP_ID,
	        clientSecret    : process.env.GOOGLE_SECRET,
	        callbackURL     : process.env.GOOGLE_CALLBACK,
	        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

	    },
    	(req, token, refreshToken, profile, next) => {
			process.nextTick(() => {
				
				User.findOne({ 'google.id' : profile.id }, (err, user) => {

					if (err) {
						return next(err);
					}

					if (!user) {
						return next(null, false, req.flash('gooogleError', 'User are not exist.'));
					}

					// if there is a user id already but no token (user was linked at one point and then removed)
					if (!user.google.token) {
						user.google.token = token;
						user.google.name  = profile.displayName;
						user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

						user.save((err) => {
							if (err)
								return next(err);

							return next(null, user);
						});
					}

					return next(null, user); // user found, return that user
				});
			});
		}
	));

	passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;