exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect('/')
	}
	next()
}

exports.isLogged = function(req, res, next) {
	if (req.isAuthenticated()) {
		var user = {
			id: req.user.id,
			idSlug: req.user.id.replace('|', '-')
		}
		console.log(req.user)
		res.locals.user = user
	}
	else{
		res.locals.user = null
	}
	next()
}
