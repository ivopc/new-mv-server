const QueryExecutor = require("../database/MySQLQueryExecutor");
const { booleanToInt } = require("../utils");

const createUser = async (username, cryptedPassword, email, lang) => {
	return await QueryExecutor.query("INSERT INTO `users` SET ?", {
	    id: null,
	    confirmed: 0,
	    fb_id: 0,
	    reg_date: Date.now(),
	    email,
	    username,
	    password: cryptedPassword,
	    rank: 0,
	    vip: 0,
	    vip_date: 0,
	    ban: 0,
	    ban_date: 0,
	    lang
	});
};

const fetchUserById = async id => {
    return await QueryExecutor.query("SELECT * FROM `users` WHERE `id` = ?", [id]);
};

const userExists = async username => {
    const exists = await QueryExecutor.query("SELECT `username` FROM `users` WHERE `username` = ?", [username]);
    console.log(exists);
    return exists.length > 0;
};

const emailInUse = async email => {
	const exists = await QueryExecutor.query("SELECT `email` FROM `users` WHERE `email` = ?", [email]);
	return exists.length > 0;
};

const setUserBannedById = async (id, isBanned) => {
	const ban = booleanToInt(isBanned);
	return await QueryExecutor.query(`UPDATE \`users\` SET \`ban\` = '${ban}' WHERE \`id\` = ?`, [id]);
};

module.exports = { createUser, fetchUserById, userExists, emailInUse, setUserBannedById };