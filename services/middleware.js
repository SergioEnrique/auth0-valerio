exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect('/')
	}
	next()
}

exports.isLogged = function(req, res, next) {
	if (req.isAuthenticated()) {
		var user = req.user
		user.idSlug: user.id.replace('|', '-')
		res.locals.user = user
	}
	else{
		res.locals.user = null
	}
	next()
}
