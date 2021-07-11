const { GAME_AUTH_TOKEN_LENGTH, USER_CSRF_TOKEN_LENGTH } = require("../../../constants/Account");

module.exports = (userData, session) => {
    const token = {
        auth: randomString(GAME_AUTH_TOKEN_LENGTH),
        csrf: randomString(USER_CSRF_TOKEN_LENGTH)
    };
    session.isConnected = true;
    session.userId = userData.id;
    session.username = userData.username;
    session.authToken = token.auth;
    session.csrfToken = token.csrf;
    session.rank = userData.rank;
    session.lang = userData.lang;
};