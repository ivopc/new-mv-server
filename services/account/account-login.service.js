const { comparePasswordHash } = require("../../utils");
const { userExists } = require("../../models/users.db");

const checkIfUserExists = async username => {
	return await userExists(username);
};

const checkPassword = async (inputPassword, databasePassword) => {
	return await comparePasswordHash(inputPassword, databasePassword);
};

module.exports = { checkIfUserExists, checkPassword };