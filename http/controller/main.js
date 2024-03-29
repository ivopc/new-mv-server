module.exports = async (req, res) => {
	// if user is not logged in
	if (!req.session["isConnected"]) {
		res.render("login");
		return;
	};

	// render default dashboard
	res.render("dashboard", {
        isConnected: true,
        uid: req.session["uid"],
        username: req.session["username"],
        authToken: req.session["authToken"],
        csrfToken: req.session["csrfToken"],
        lang: req.session["lang"]
	});
};