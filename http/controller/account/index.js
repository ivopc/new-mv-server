const { checkIfUserExists, checkPassword } = require("../../../services/account/account-login.service");
const { checkIfEmailInUse, createNewUser, isRegisterInputValid } = require("../../../services/account/account-register.service");
const { randomString } = require("../../../utils");
const { LOGIN, REGISTER, GAME_AUTH_TOKEN_LENGTH, USER_CSRF_TOKEN_LENGTH } = require("../../../constants/Account");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const login = new Login(req, res);
    // validate inputs
    if (!login.isInputValid(username || "", password || "")) {
        res.status(401).json({error: LOGIN.ERROR.LENGTH});
        return;
    };
    let user;
    // checking if user exists
    try {
        // (just a boolean to make it readable)
        const GET_USER_DATA = true;
        [ user ] = await checkIfUserExists(username, GET_USER_DATA);
    } catch (err) {
        res.status(500).json({error: LOGIN.ERROR.INTERNAL_ERROR});
        return; 
    };
    // if user do not exists
    if (!user) {
        res.status(401).json({error: LOGIN.ERROR.USER_PASSWORD_INVALID});
        return;
    };
    // if user is banned
    if (user.ban) {
        res.status(401).json({error: LOGIN.ERROR.USER_BANNED});
        return;
    };
    // check if user password is equals (inputPassword, databasePassword)
    const isPasswordEquals = await checkPassword(password, user.password);
    // login or send error
    if (isPasswordEquals) {
        login.createSession(user);
        res.json({success: true});
    } else {
        res.status(401).json({error: LOGIN.ERROR.USER_PASSWORD_INVALID});
    };
};

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    //const register = new Register(req, res);
    // validate inputs
    try {
        isRegisterInputValid(req.body);
    } catch (err) {
        res.status(401).json({ error: REGISTER.ERROR.INVALID_INPUT });
        return;
    };

    try {
        // check if user exists and email is in use 
        // (just a boolean to make it readable)
        const GET_USER_DATA = false;
        const [ userExists, emailInUse ] = await Promise.all([
            checkIfUserExists(username, GET_USER_DATA),
            checkIfEmailInUse(email)
        ]);
        if (userExists) {
            res.status(401).json({ error: REGISTER.ERROR.USER_ALREADY_EXISTS });
            return;
        };
        if (emailInUse) {
            res.status(401).json({ error: REGISTER.ERROR.EMAIL_ALREADY_IN_USE });
            return;
        };
    } catch (err) {
        res.status(401).json({ error: 999 });
    };
    const newUser = await createNewUser(username, password, email, 0);
    createSession({
        id: newUser.insertId,
        username,
        rank: 0,
        lang: 0
    }, req);
    res.json({ success: true });
};

exports.logout = async (req, res) => {
    // if auth token is diffent from input token
    if (req.body["token"] !== req.session["csrfToken"]) {
        res.status(401).json({success: false});
        return;
    };
    // destroy session
    await new Promise(resolve => req.session.destroy(resolve));
    res.json({success: true});
};

exports.settings = async (req, res) => {};

function createSession (userData, req) {
    //generate session tokens 
    const token = {
        auth: randomString(GAME_AUTH_TOKEN_LENGTH),
        csrf: randomString(USER_CSRF_TOKEN_LENGTH)
    };
    // make session
    req.session.isConnected = true;
    req.session.uid = userData.id;
    req.session.username = userData.username;
    req.session.authToken = token.auth;
    req.session.csrfToken = token.csrf;
    req.session.rank = userData.rank;
    req.session.lang = userData.lang;
}