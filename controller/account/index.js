const Login = require("./classes/Login");
const Register = require("./classes/Register");
const { checkIfUserExists, checkPassword } = require("../../services/account/account-login.service");
const { checkIfEmailInUse, createNewUser } = require("../../services/account/account-register.service");
const { LOGIN, REGISTER } = require("../../constants/Account");

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
        // (just a constant to make it readable)
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
    console.log({ old: "sim", username, password, email });
    const register = new Register(req, res);
    // validate inputs
    if (!register.isInputValid(username || "", password || "", email || "")) {
        res.status(401).json({error: REGISTER.ERROR.INVALID_INPUT});
        return;
    };
    // check if user exists and email is in use 
    // (just a boolean to make it interpretable)
    const GET_USER_DATA = false;
    const [ userExists, emailInUse ] = await Promise.all([
        checkIfUserExists(username, GET_USER_DATA),
        checkIfEmailInUse(email)
    ]);
    if (userExists) {
        res.status(401).json({error: REGISTER.ERROR.USER_ALREADY_EXISTS});
        return;
    };
    if (emailInUse) {
        res.status(401).json({error: REGISTER.ERROR.EMAIL_ALREADY_IN_USE});
        return;
    };
    console.log({ old: "sim", username, password, email, userExists, emailInUse });
    const newUser = await createNewUser(username, password, email, 0);
    register.createSession({
        id: newUser.insertId,
        username,
        rank: 0,
        lang: 0
    });
    res.json({success: true});
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