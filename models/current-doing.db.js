const QueryExecutor = require("../database/MySQLQueryExecutor");
const { booleanToInt } = require("../utils");

const insertCurrentDoing = async userId => {
	return await QueryExecutor.query("INSERT INTO `current_doing` SET ?", {
        user_id: userId,
        battle_type: 0,
        if_is_pvp_battle_id: 0,
        waiting_wild_battle: booleanToInt(false),
        doing_battle_action: booleanToInt(false),
        requesting_flag: booleanToInt(false)
    });
};
const getCurrentDoing = async userId => {
	const [ currentDoing ] = await QueryExecutor.query(
		"SELECT `battle_type`, `if_is_pvp_battle_id`, `doing_battle_action`, `requesting_flag` FROM `current_doing` WHERE `user_id` = ?",
		[userId]
	);
	return currentDoing;
};

const setBattling = async (userId, battleType) =>
    await QueryExecutor.query(
        "UPDATE `current_doing` SET `battle_type` = ? WHERE `user_id` = ?",
        [battleType, userId]
    );

const setNotBattling = async userId => 
    await QueryExecutor.query(
        "UPDATE `current_doing` SET `doing_battle_action` = '0', `battle_type` = '0' WHERE `user_id` = ?",
        [userId]
    );


const isBattling = async userId => {
    const currentDoing = await getCurrentDoing(userId);
    return currentDoing.battle_type > 0;
};

module.exports = { 
    insertCurrentDoing, 
    getCurrentDoing, 
    setNotBattling, 
    setBattling,
    isBattling
};