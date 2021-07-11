const { LOGIN } = require("../../../constants/Account");

const createSession = require("./create-session");
const isValidInput = require("./is-valid-input");

module.exports = async (req, res) => {
    const { username, password } = req.body;
    if (!isValidInput(username || "", password || "")) {
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
    if (user.ban) {
        res.status(401).json({error: LOGIN.ERROR.USER_BANNED});
        return;
    };
    // (inputPassword, databasePassword)
    const isPasswordEquals = await checkPassword(password, user.password);
    if (isPasswordEquals) {
        createSession(user, req.session);
        res.json({ success: true });
    } else {
        res.status(401).json({error: LOGIN.ERROR.USER_PASSWORD_INVALID});
    };
};