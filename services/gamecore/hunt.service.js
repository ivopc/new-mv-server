const { MONSTER_TYPE } = require("../../constants/Monster");
const { BATTLE_TYPES } = require("../../constants/Battle");

const { mathRandomBetween } = require("../../utils");

const { insertBattle } = require("../../models/battle.db");
const { insertMonster, getAliveWildMonster } = require("../../models/monster.db");
const { setBattling } = require("../../models/current-doing.db");
const { getMonstersInParty } = require("../../models/party.db");

const Resources = {
    WildAppearRate: require("../../database/game/wildappearrate.json")
};

const createBattle = async uid => {
    return await insertBattle(uid, {
        battle_type: BATTLE_TYPES.WILD
    });
};

const generateRandomWild = (mapId = 0, zoneName = "florest") => {
    const possibleWilds = Resources.WildAppearRate[mapId][zoneName];
    const rarity = randomizeRarity();
    const wildList = possibleWilds[getCurrentDayPeriod()][rarity.rarity];
    const monsterpediaId = wildList[Math.floor(Math.random() * wildList.length)];
    const level = mathRandomBetween([1, 3]);
    return { monsterpediaId, level };
};

const randomizeRarity = () => {
    const rate = Math.floor(Math.random() * 25000) + 1;
    if (rate <= 17000) // 68%
        return {"rarity": "common"};
    else if (rate <= 22000) // 20%
        return {"rarity": "uncommon"};
    else if (rate <= 24900) // 11.6%
        return {"rarity": "rare"};
    else
        return {"rarity": "rare2"}; // 0.4%
};

const insertWildMonster = async (uid, monsterData) => {
    return await insertMonster(uid, {
        monsterpedia_id: monsterData.monsterpediaId,
        level: monsterData.level,
        type: MONSTER_TYPE.WILD
    });
};

const setUserBattlingVsWild = async uid => {
    return await setBattling(uid, BATTLE_TYPES.WILD);
};

const getPlayerPartyMonster = async uid => {
    return await getMonstersInParty(uid);
};

const getCurrentDayPeriod = () => "morning";

module.exports = { 
    createBattle, generateRandomWild, insertWildMonster, 
    getPlayerPartyMonster, setUserBattlingVsWild 
};