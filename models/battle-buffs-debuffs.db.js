const QueryExecutor = require("../database/MySQLQueryExecutor");

const getBattleBuffsDebuffs = async battleId => {
    return await QueryExecutor.query(
        "SELECT * FROM `battle_buffs_nerfs` WHERE `battle_id` = ?",
        [battleId]
    );
};

module.exports = { getBattleBuffsDebuffs };