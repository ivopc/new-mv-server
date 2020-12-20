const { randomString, validateEmail } = require("../../../utils");

class Register {
	constructor (req, res) {
		this.req = req;
		this.req = req;
	}

	isInputValid (username, password, email) {
        const isValidUsername = username.length >= 3 && username.length <= 20;
        const isValidPassword = password.length >= 6;
        const isValidEmail = validateEmail(email);

        return isValidUsername && isValidPassword && isValidEmail;
	}
}

module.exports = Register;