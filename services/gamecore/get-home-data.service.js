const { getMonstersInParty } = require("../../models/party.db");
const { getGameData } = require("../../models/gamedata.db");

const getPlayerData = async userId => {
    const [ partyMonsters, gameData ] = await Promise.all([
        getMonstersInParty(userId),
        getGameData(userId)
    ]);
    return { partyMonsters, gameData };
};

module.exports = { getPlayerData };
