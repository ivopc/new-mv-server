const QueryExecutor = require("../database/MySQLQueryExecutor");

const getBattleBuffsDebuffs = async battleId => {
    return await QueryExecutor.query(
        "SELECT * FROM `battle_buffs_debuffs` WHERE `battle_id` = ?",
        [battleId]
    );
};

module.exports = { getBattleBuffsDebuffs };