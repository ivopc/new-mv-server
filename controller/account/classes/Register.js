const { randomString, validateEmail } = require("../../../utils");

class Register {
	constructor (req, res) {
		this.req = req;
		this.req = req;
	}

	isInputValid (username = "", password = "", email = "") {
        const isValidUsername = username.length >= 3 && username.length <= 20;
        const isValidPassword = password.length >= 6;
        const isValidEmail = validateEmail(email);

        return isValidUsername && isValidPassword && isValidEmail;
	}

	createSession (userData) {
        //generate session tokens 
        const token = {
            auth: randomString(150),
            csrf: randomString(30)
        };
        // make session
        this.req.session.isConnected = true;
        this.req.session.uid = userData.id;
        this.req.session.username = userData.username;
        this.req.session.authToken = token.auth;
        this.req.session.csrfToken = token.csrf;
        this.req.session.rank = userData.rank;
        this.req.session.lang = userData.lang;
	}
}

module.exports = Register;