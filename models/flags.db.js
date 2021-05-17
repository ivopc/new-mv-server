const QueryExecutor = require("../database/MySQLQueryExecutor");

const { FLAG_TYPES } = require("../constants/Flags");

const insertUpdateFlag = async (userId, type, flagId, value) => {
    const flag = await getFlag(userId, type, flagId);
    if (flag) {
        await QueryExecutor.query(
            "UPDATE `flags` SET `value` = ? WHERE `id` = ?",
            [value, flag.id]
        );
    } else {
        await QueryExecutor.query("INSERT INTO `flags` SET ?", {
            id: null,
            user_id: userId,
            type,
            flag_id: flagId,
            value
        });
    };
};

const getFlag = async (userId, type, flagId) => {
    const [ flag ] = await QueryExecutor.query("SELECT * FROM `flags` WHERE `user_id` = ? AND `type` = ? AND `flag_id` = ?", [userId, type, flagId]);
    return flag;
};

const getFlagsByType = async (userId, type) =>
    await QueryExecutor.query("SELECT * FROM `flags` WHERE `user_id` = ? AND `type`= ?", [userId, type]);

const getFlagFromLevel = async (userId, levelId) => {
    const [ flag ] = await QueryExecutor.query("SELECT * FROM `flags` WHERE `user_id` = ? AND `type`= ? AND `flag_id` = ?", [userId, FLAG_TYPES.LEVEL, levelId]);
    return flag;
};

const getTamerFlag = async (userId, flagId) =>
    await  QueryExecutor.query(
        "SELECT `value`, `flag_id` FROM `flags` WHERE `type` = ? AND `flag_id` = ? AND `user_id` = ?",
        [FLAG_TYPES.TAMER, flagId, userId]
    );

module.exports = { 
    insertUpdateFlag, 
    getFlag, 
    getFlagsByType, 
    getFlagFromLevel,
    getTamerFlag
};