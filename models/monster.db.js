const QueryExecutor = require("../database/MySQLQueryExecutor");
const { booleanToInt, escapeSQLQuery } = require("../utils");

const Resources = {
    Dex: require("../database/game/dex.json"),
    Formulas: require("../formulas")
};

const insertMonster = async (userId, monsterData = {}) => {
    monsterData.id = null;
    monsterData.user_id = userId;
    monsterData.enabled = booleanToInt(true);
    monsterData.type = monsterData.type || 0;
    monsterData.shiny = booleanToInt(false);
    monsterData.is_initial = booleanToInt(monsterData.is_initial) || booleanToInt(false);
    monsterData.trade_enabled = "trade_enabled" in monsterData ? booleanToInt(monsterData.trade_enabled) : booleanToInt(true);
    monsterData.in_party = booleanToInt(monsterData.in_party) || booleanToInt(false);
    monsterData.level = monsterData.level || 0;
    monsterData.experience = Resources.Formulas.Exp.Calc.level2Exp(monsterData.level);
    monsterData.gender = monsterData.gender || Resources.Formulas.Monster.Generate.Gender(monsterData.monsterpedia_id);
    monsterData.nickname = "";
    monsterData.hold_item = monsterData.hold_item || 0;
    monsterData.catch_item = monsterData.catch_item || 1;
    // const moves = this.learnAllMoves({
    //     level: monsterData.level,
    //     id: monsterData.monsterpedia_id
    // });
    const moves = [0, 0, 0, 0];
    monsterData.move_0 = moves[0] || 0;
    monsterData.move_1 = moves[1] || 0;
    monsterData.move_2 = moves[2] || 0;
    monsterData.move_3 = moves[3] || 0;
    const SP = Resources.Formulas.Stats.Generate.SP();
    const stats = Resources.Formulas.Stats.Calc.stats.all({
        sp: {
            hp: SP.hp,
            atk: SP.atk,
            def: SP.def,
            spe: SP.spe
        },
        dp: {
            hp: 0,
            atk: 0,
            def: 0,
            spe: 0
        },
        level: monsterData.level,
        baseStats: Resources.Dex[monsterData.monsterpedia_id].baseStats
    });
    monsterData.status_problem = 0;
    monsterData.current_HP = stats.hp;
    monsterData.stats_HP = stats.hp;
    monsterData.stats_attack = stats.atk;
    monsterData.stats_defense = stats.def;
    monsterData.stats_speed = stats.spe;
    monsterData.current_MP = 100;
    monsterData.stats_MP = 100;
    monsterData.dp_HP = 0;
    monsterData.dp_attack = 0;
    monsterData.dp_defense = 0;
    monsterData.dp_speed = 0;
    monsterData.sp_HP = SP.hp;
    monsterData.sp_attack = SP.atk;
    monsterData.sp_defense = SP.def;
    monsterData.sp_speed = SP.spe;
    monsterData.vita_HP = 0;
    monsterData.vita_attack = 0;
    monsterData.vita_defense = 0;
    monsterData.vita_speed = 0;
    monsterData.egg_is = booleanToInt(monsterData.egg_is) || 0;
    monsterData.egg_date = monsterData.egg_date || 0;

    return await QueryExecutor.query("INSERT INTO `monsters` SET ?", monsterData);
};

const getMonster = async id => {
    const [ monster ] = await QueryExecutor.query(
        "SELECT * FROM `monsters` WHERE `id` = ?",
        [id]
    );
    return monster;
};

const isMonsterFromPlayer = async (monsterId, userId) => {
    const isFrom = await QueryExecutor.query(
        "SELECT `id` FROM `monsters` WHERE `id` = ? and `user_id` = ?",
        [monsterId, userId]
    );
    return isFrom.length > 0;
};

const disableMonster = async id => {
    return await QueryExecutor.query(
        "UPDATE `monsters` SET `enabled` = '0' WHERE `enabled` = '1' AND `id` = ?",
        [id]
    );
};

const getAliveWildMonster = async userId => {
    const [ wild ] = await QueryExecutor.query(
        "SELECT * FROM `monsters` WHERE `type` = '1' AND `user_id` = ? AND `enabled` = '1'",
        [userId]
    );
    return wild;
};

const discontHealth = async (id, damage) => {
    return await QueryExecutor.query(
        `UPDATE \`monsters\` SET \`current_HP\` = \`current_HP\` - '${damage}' WHERE \`id\` = ?`,
        [id]
    );
};

const discontMana = async () => {};

const setMove = async (monsterId, moveId, slotPosition) => {
    return await QueryExecutor.query(
        `UPDATE \`monsters\` SET \`move_${escapeSQLQuery(slotPosition)}\` = ? WHERE \`id\` = ?`,
        [moveId, monsterId]
    );
};

module.exports = {
    insertMonster,
    getMonster,
    disableMonster,
    isMonsterFromPlayer,
    getAliveWildMonster,
    discontHealth,
    discontMana,
    setMove
};