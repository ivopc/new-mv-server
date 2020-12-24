const QueryExecutor = require("../database/MySQLQueryExecutor");
const { booleanToInt } = require("../utils");

const insertCurrentDoing = async uid => {
	return await QueryExecutor.query("INSERT INTO `current_doing` SET ?", {
        uid,
        battle_type: 0,
        if_is_pvp_battle_id: 0,
        waiting_wild_battle: booleanToInt(false),
        doing_battle_action: booleanToInt(false),
        requesting_flag: booleanToInt(false)
    });
};

const getCurrentDoing = async uid => {
	const [ currentDoing ] = await QueryExecutor.query(
		"SELECT `battle_type`, `if_is_pvp_battle_id`, `doing_battle_action`, `requesting_flag` WHERE `uid` = ?",
		[uid]
	);
	return currentDoing;
};

module.exports = { insertCurrentDoing, getCurrentDoing };