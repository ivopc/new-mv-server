const { checkBlockPages } = require("../services/main/check-block-pages.service");


module.exports = async (req, res) => {
	// if user is not logged in
	if (!req.session["isConnected"]) {
		res.render("login");
		return;
	};
	let blocks = {
		captcha: false,
		initial: false
	};
	switch (await checkBlockPages()) {
		case 1: {
			blocks.captcha = true;
			break;
		};
		case 2: {
			blocks.initial = true;
			break;
		};
	};

	// render default dashboard
	res.render("dashboard", {
        isConnected: true,
        uid: req.session["uid"],
        username: req.session["username"],
        authToken: req.session["authToken"],
        csrfToken: req.session["csrfToken"],
        lang: req.session["lang"],
        blocks
	});
};