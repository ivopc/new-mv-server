const { randomString } = require("../../../utils");

class Login {
    constructor (req, res) {
        this.req = req;
        this.res = res;
    }

    isInputValid (username = "", password = "") {
        const isValidUsername = username.length >= 3 && username.length <= 20;
        const isValidPassword = password.length >= 6;

        return isValidUsername && isValidPassword;
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
};

module.exports = Login;