const { comparePasswordHash } = require("../../utils");
const { userExists } = require("../../models/users.db");

const checkIfUserExists = async (username, getUserData) => {
	return await userExists(username, getUserData);
};

const checkPassword = async (inputPassword, databasePassword) => {
	return await comparePasswordHash(inputPassword, databasePassword);
};

module.exports = { checkIfUserExists, checkPassword };