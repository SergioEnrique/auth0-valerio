var passport = require('passport')
var Auth0Strategy = require('passport-auth0')
var session = require('express-session')
var cookieParser = require('cookie-parser')

exports.configPassport = function(config) {
	// Configuraciones Passport para inicio de sesión
	passport.use(new Auth0Strategy({
		domain:       config.domain,
		clientID:     config.client_id,
		clientSecret: config.client_secret,
		callbackURL:  config.url+'/callback'
		}, function(accessToken, refreshToken, extraParams, profile, done) {
			// accessToken is the token to call Auth0 API (not needed in the most cases)
			// extraParams.id_token has the JSON Web Token
			// profile has all the information from the user
			return done(null, profile)
		})
	)

	passport.serializeUser(function(user, done) {
		done(null, user)
	})

	passport.deserializeUser(function(user, done) {
		done(null, user)
	})

	return passport
}

exports.configSession = function(config, router, passport) {
	
	router.use(cookieParser())

	router.use(session({
		genid: function(req) {
			return require('crypto').randomBytes(48).toString('hex');
		},
		secret: config.session_secret,
	    resave: true,
	    saveUninitialized: true
	}))

	router.use(passport.initialize())
	router.use(passport.session())	

	return router
}