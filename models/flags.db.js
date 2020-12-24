const QueryExecutor = require("../database/MySQLQueryExecutor");

const insertUpdateFlag = async (uid, type, flagId, value) => {
	const flag = await getFlag(uid, type, flagId)
	if (flag) {
		await QueryExecutor.query(
			"UPDATE `flags` SET `value` = ? WHERE `id` = ?",
			[value, flag.id]
		);
	} else {
		await QueryExecutor.query("INSERT INTO `flags` SET ?", {
			id: null,
			uid,
			type,
			flag_id: flagId,
			value
		});
	};
};

const getFlag = async (uid, type, flagId) => {
	const [ flag ] = await QueryExecutor.query("SELECT * FROM `flags` WHERE `uid` = ? AND `type` = ? AND `flag_id` = ?", [uid, type, flagId]);
	return flag;
};

module.exports = { insertUpdateFlag, getFlag };