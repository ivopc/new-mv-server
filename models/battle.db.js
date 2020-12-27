const { BATTLE_TYPES } = require("../constants/Battle");

const { booleanToInt } = require("../utils");

const QueryExecutor = require("../database/MySQLQueryExecutor");

const { getMonstersInParty } = require("./party.db");
const { getAliveWildMonster } = require("./monster.db");
const { getBattleBuffsDebuffs } = require("./battle-buffs-debuffs.db");

const PartySchema = require("../schemas/Party");

const insertBattle = async (uid, battleData) => {
    // id da batalha é nulo (AUTO_INCREMENT)
    battleData.id = null;
    battleData.uid = uid;
    // batalha habilitada
    battleData.enabled = booleanToInt(true);
    // tipo de batalha: 1 = wild | 2 = domador | 3 = pvp | 4 = monstro indomável
    battleData.battle_type = battleData.battle_type || 1;
    // categoria do local da batalha: 
    // 1 = mato | 2 = água | 3 = lava | 4 = caverna
    battleData.field_category = battleData.field_category || 1;
    /* condições climáticas de batalha:
       0 = normal | 1 = chuva | 2 = ensolarado | 3 = tempestade de areia 
       4 = chuva de granizo*/
    battleData.field_weather = battleData.field_weather || 0;
    battleData.field_special = 0;
    battleData.need_to_trade_fainted_monster = 0;
    battleData.seen_presentation = 0;
    // se for pvp ou batalha contra domador, quem foi desafiado? 
    battleData.challenged = battleData.challenged || 0;
    return await QueryExecutor.query("INSERT INTO `battle` SET ?", battleData);
};

const getBattle = async uid => {
    const [ battle ] = await QueryExecutor.query(
        "SELECT * FROM `battle` WHERE `uid` = ?",
        [uid]
    );
    return battle;
};

const deleteBattle = async uid => {
    return await QueryExecutor.query("DELETE FROM `battle` WHERE `uid` = ?", [uid]);
};

const getAllBattleInfo = async (battleType, uid) => {
    switch (battleType) {
        case BATTLE_TYPES.WILD: {
            const [ _playerMonsters, wildMonster, battleData ] = await Promise.all([
                getMonstersInParty(uid),
                getAliveWildMonster(uid),
                getBattle(uid)
            ]);
            const playerMonsters = new PartySchema(_playerMonsters);
            const buffsDebuffs = await getBattleBuffsDebuffs(battleData.id);
            return { playerMonsters, wildMonster, battleData, buffsDebuffs };
            break;
        };
    };
};

module.exports = { insertBattle, getBattle, deleteBattle, getAllBattleInfo };