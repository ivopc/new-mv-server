module.exports = (req, res, next) => {
	if (!req.session["isConnected"]) {
		res.json({login: true});
		return;
	};
    next();
};