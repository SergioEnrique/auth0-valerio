exports.logout= function(req, res) {
    req.logout()
    res.redirect('/')
}

exports.callback = function(req, res) {
	if (!req.user) {
		res.send('Error al iniciar sesión')
	}
	else{
		var uid = req.user.id
		uid = uid.replace('|', '-')
		res.redirect("/dashboard")
	}
}
