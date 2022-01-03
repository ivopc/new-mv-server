const createSession = require("./create-session");
const isValidInput = require("./is-valid-input");
const { validateEmail } = require("../../../utils");

module.exports = async (req, res) => {
    const { username, password, email } = req.body;
    if (!isValidInput(username || "", password || "") && !validateEmail(email)) {
        res.status(401).json({ error: REGISTER.ERROR.INVALID_INPUT });
        return;
    };
    // (just a constant to make it interpretable)
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
    console.log({ username, password, email, userExists, emailInUse });
    const newUser = await createNewUser(username, password, email, 0);
    createSession({
        id: newUser.insertId,
        username,
        rank: 0,
        lang: 0
    }, req.session);
    res.json({ success: true });
};