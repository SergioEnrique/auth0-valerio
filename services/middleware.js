exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect('/')
	}
	next()
}

exports.isLogged = function(req, res, next) {
	if (req.isAuthenticated()) {
		var uid = req.user.id
		res.locals.uid = uid.replace('|', '-')
	}
	else{
		res.locals.uid = null
	}
	next()
}
