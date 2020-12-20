const { cryptPassword } = require("../../utils");
const { createUser, emailInUse } = require("../../models/users.db");

const checkIfEmailInUse = async email => {
    return await emailInUse(email);
};

const createNewUser = async (username, password, email, lang) => {
    const cryptedPassword = await cryptPassword(password);
    const newUser = await createUser(username, cryptedPassword, email, lang);
    return newUser;
};

module.exports = { checkIfEmailInUse, createNewUser };