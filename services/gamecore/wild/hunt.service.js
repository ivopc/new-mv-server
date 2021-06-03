const { MONSTER_TYPE, RARITY } = require("../../../constants/Monster");
const { BATTLE_TYPES } = require("../../../constants/Battle");

const { mathRandomBetween } = require("../../../utils");

const { insertBattle } = require("../../../models/battle.db");
const { insertMonster, getAliveWildMonster } = require("../../../models/monster.db");
const { setBattling } = require("../../../models/current-doing.db");
const { getMonstersInParty } = require("../../../models/party.db");

const { getPlayerCharacterData } = require("../character/get-set.service");

const Resources = {
    WildLocation: require("../../../database/game/wild_location.json")
};

const search = async userId => {
    const playerCharacterData = await getPlayerCharacterData(userId);
    const generatedWild = generateRandomWild(playerCharacterData.level);
    await insertWildMonster(userId, generatedWild);
    return generatedWild;
};

const generateRandomWild = levelId => {
    const levelLocation = Resources.WildLocation[levelId];
    const possibleWilds = levelLocation[getCurrentDayPeriod()][randomizeRarity()];
    const monsterpediaId = possibleWilds[Math.floor(Math.random() * possibleWilds.length)];
    const level = mathRandomBetween(levelLocation.levelRate);
    return { monsterpediaId, level };
};

const randomizeRarity = () => {
    const rate = Math.floor(Math.random() * 25000) + 1;
    if (rate <= 17000) // 68%
        return RARITY.COMMON;
    else if (rate <= 22000) // 20%
        return RARITY.UNCOMMON;
    else if (rate <= 24900) // 11.6%
        return RARITY.RARE;
    else
        return RARITY.RARE2; // 0.4%
};

const insertWildMonster = async (userId, monsterData) => 
    await insertMonster(userId, {
        monsterpedia_id: monsterData.monsterpediaId,
        level: monsterData.level,
        type: MONSTER_TYPE.WILD
    });

const createBattle = async userId =>
    await insertBattle(userId, {
        battle_type: BATTLE_TYPES.WILD
    });

const setUserBattlingVsWild = async userId =>
    await setBattling(userId, BATTLE_TYPES.WILD);

const getPlayerPartyMonster = async userId =>
    await getMonstersInParty(userId);

const getCurrentDayPeriod = () => "morning";

module.exports = {
    search,
    createBattle,
    generateRandomWild,
    insertWildMonster,
    getPlayerPartyMonster,
    setUserBattlingVsWild
};