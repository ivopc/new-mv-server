const { booleanToInt } = require("../utils");
const QueryExecutor = require("../database/MySQLQueryExecutor");

const Resources = {
    Dex: require("../database/game/dex.json"),
    Formulas: require("../formulas")
};

const insertMonster = async (uid, monsterData) => {
    monsterData.id = null;
    monsterData.uid = uid;
    monsterData.enabled = booleanToInt(true);
    monsterData.type = monsterData.type || 0;
    monsterData.shiny = booleanToInt(false);
    monsterData.is_initial = booleanToInt(monsterData.is_initial) || booleanToInt(false);
    monsterData.trade_enabled = "trade_enabled" in monsterData ? booleanToInt(monsterData.trade_enabled) : booleanToInt(true);
    monsterData.in_pocket = booleanToInt(monsterData.in_pocket) || booleanToInt(false);
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
        baseStats: Resources.Dex[monsterData.monsterpedia_id]["baseStats"]
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

const disableMonster = async id => {
    return await QueryExecutor.query(
        "UPDATE `monsters` SET `enabled` = '0' WHERE `enabled` = '1' AND `id` = ?",
        [id]
    );
};

const getAliveWildMonster = async uid => {
    const [ wild ] = await QueryExecutor.query(
        "SELECT * FROM `monsters` WHERE `type` = '1' AND `uid` = ? AND `enabled` = '1'",
        [uid]
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

module.exports = {
    insertMonster, getMonster, disableMonster, 
    getAliveWildMonster, discontHealth, discontMana
};