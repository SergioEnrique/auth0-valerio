// Dependencias
var express = require('express')

var webService = require('./webService')
var middleware = require('./middleware')
var sessionService = require('./sessionService')

module.exports = function(auth0Config) {

	var router = new express.Router()

	// Configuraciones de Sesiones de usuario
	var passport = sessionService.configPassport(auth0Config)
	router = sessionService.configSession(auth0Config, router, passport)

	// MiddleWare que se ocupa en todas las rutas web
	router.use(middleware.isLogged)

	// RUTAS

	// Cerrar sesión
	router.get('/logout', webService.logout)
	// Callback de login
	router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/' }), webService.callback)
	// Dashboard
	router.get('/dashboard', middleware.requiresLogin)

	return router
}