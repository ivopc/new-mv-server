const { MONSTER_TYPE, MONSTER_RARITY } = require("../../../constants/Monster");
const { BATTLE_TYPES } = require("../../../constants/Battle");
const { WILD_MONSTER_POSSIBILITIES } = require("../../../constants/SortRate");

const { mathRandomBetween } = require("../../../utils");
const randomSort = require("../../../utils/random-sort");

const { insertBattle, getBattle } = require("../../../models/battle.db");
const { insertMonster, getAliveWildMonster } = require("../../../models/monster.db");
const { setBattling } = require("../../../models/current-doing.db");
const { getMonstersInParty } = require("../../../models/party.db");

const { getPlayerCharacterData } = require("../character/get-set.service");

const Resources = {
    WildLocation: require("../../../database/game/wild_location.json")
};

async function search (userId) {
    const playerCharacterData = await getPlayerCharacterData(userId);
    const generatedWild = generateRandomWild(playerCharacterData.level);
    await insertWildMonster(userId, generatedWild);
    return generatedWild;
};

async function startBattle (userId) {
    const [ battleRef, currentDoing, wildMonster ] = await Promise.all([
        createBattle(userId),
        setUserBattlingVsWild(userId),
        getAliveWildMonster(userId)
    ]);
    const battle = await getBattle(userId);
    console.log("dados da batalha", battle);
    return { wildMonster, battle };
};

function generateRandomWild (levelId) {
    const levelLocation = Resources.WildLocation[levelId];
    const possibleWilds = levelLocation[getCurrentDayPeriod()][randomSort(WILD_MONSTER_POSSIBILITIES)];
    const monsterpediaId = possibleWilds[Math.floor(Math.random() * possibleWilds.length)];
    const level = mathRandomBetween(levelLocation.levelRate);
    return { monsterpediaId, level };
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

const getCurrentDayPeriod = () => "morning";

module.exports = { search, startBattle };