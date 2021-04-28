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
		"SELECT `battle_type`, `if_is_pvp_battle_id`, `doing_battle_action`, `requesting_flag` FROM `current_doing` WHERE `uid` = ?",
		[uid]
	);
	return currentDoing;
};

const setBattling = async (uid, battleType) =>
    await QueryExecutor.query(
        "UPDATE `current_doing` SET `battle_type` = ? WHERE `uid` = ?",
        [battleType, uid]
    );

const setNotBattling = async uid => 
    await QueryExecutor.query(
        "UPDATE `current_doing` SET `doing_battle_action` = '0', `battle_type` = '0' WHERE `uid` = ?",
        [uid]
    );


const isBattling = async uid => {
    const currentDoing = await getCurrentDoing(uid);
    return currentDoing.battle_type > 0;
};

module.exports = { 
    insertCurrentDoing, 
    getCurrentDoing, 
    setNotBattling, 
    setBattling,
    isBattling
};