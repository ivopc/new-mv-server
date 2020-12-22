module.exports = (req, res, next) => {
	if (!req.session["isConnected"]) {
		res.redirect("/");
		return;
	};
    next();
};