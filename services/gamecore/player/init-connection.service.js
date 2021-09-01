const { getPlayerCharacterData } = require("../character/get-set.service");
//const { checkifPlayerIsAlreadyConnected } = require("../../../models/onlineplayer.db");
const { getMonstersInParty } = require("../../../models/party.db");
const { getFlagFromLevel } = require("../../../models/flags.db");
const { getCurrentDoing } = require("../../../models/current-doing.db");
const { getAllItems } = require("../../../models/items.db");
const { getNotifications } = require("../../../models/notification.db");
const { getActiveTamersInLevel } = require("../level/tamer.service");
const CharacterCrud = require("../../../database/RethinkDBCharacterCrud");
const { insertPlayerCharacterCacheData, getPlayerCharacterCacheData } = require("../../../models/in-memory/player-character.db");

const { BATTLE_TYPES } = require("../../../constants/Battle");
const { STATES } = require("../../../constants/GameStates");

const alreadyConnected = async userId => 
    await checkifPlayerIsAlreadyConnected(userId);

const setPlayerOnline = async (userId, isOnline) =>
    CharacterCrud.update(userId, {online: isOnline});

const playerConnect = async (userId, socketId) => {
    await setPlayerOnline(userId, true);
    return { isAlreadyConnected: false };
    // fazer depois
    return;
    const isAlreadyConnected = await alreadyConnected(userId);
    if (isAlreadyConnected) {
        // remove socket register from db
        // --
    };
    // insert online player into the DB
    // --
    await Promise.all([
        insertOnlinePlayerSocket(userId, socketId),
        setPlayerOnline(userId, true)
    ]);

    return { isAlreadyConnected };
};

const prepareInitialData = async userId => {
    const rawInitialData = await getInitialBaseData(userId);
    await insertPlayerCharacterCacheData({
        userId,
        x: rawInitialData.character.pos_x,
        y: rawInitialData.character.pos_y,
        facing: rawInitialData.character.pos_facing,
        character: rawInitialData.character.sprite
    });
    //const { initialData, state } = await getStateParticularData(rawInitialData, userId);
    const state = STATES.OVERWORLD;
    return generateInitialData(rawInitialData, state);
};

const getInitialBaseData = async userId => {
    const [
        character,
        partyMonsters,
        items,
        currentDoing,
        notifications
    ] = await Promise.all([
        getPlayerCharacterData(userId),
        getMonstersInParty(userId),
        getAllItems(userId),
        getCurrentDoing(userId),
        getNotifications(userId)
    ]);
    const [ flag, tamersInLevel ] = await Promise.all([
        getFlagFromLevel(userId, character.level),
        getActiveTamersInLevel(userId, character.level)
    ]);
    return { character, partyMonsters, items, currentDoing, notifications, flag, tamersInLevel };
};

const getStateParticularData = async (rawInitialData, userId) => {
    let particularData;
    switch (rawInitialData.battle_type) {
        case BATTLE_TYPES.WILD: {
            particularData = await getWildBattleInitial(userId);
            return;
        };
        case BATTLE_TYPES.TAMER: {
            return;
        };
        case BATTLE_TYPES.PVP: {
            return;
        };
    };
};

const getCharacterData = async () => {
    const data = await getPlayerCharacterCacheData();
    return data;
};

const generateInitialData = (raw, state) => ({
    state,
    param: {
        monsters: raw.partyMonsters,
        position: {
            x: raw.character.pos_x,
            y: raw.character.pos_y,
            facing: raw.character.pos_facing,
        },
        items: raw.items,
        sprite: raw.character.sprite,
        level: raw.character.level,
        nickname: raw.character.nickname,
        flag: raw.flag.value,
        tamers: raw.tamersInLevel,
        notification: raw.notifications
    }
});

module.exports = { 
    alreadyConnected,
    playerConnect,
    prepareInitialData,
    getCharacterData
};