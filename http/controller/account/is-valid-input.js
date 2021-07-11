module.exports = (username = "", password = "") => {
    const isValidUsername = username.length >= USERNAME_MIN_LENGTH && username.length <= USERNAME_MAX_LENGTH;
    const isValidPassword = password.length >= PASSWORD_MIN_LENGTH;
    return isValidUsername && isValidPassword;
};