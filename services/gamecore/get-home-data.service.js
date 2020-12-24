const { getMonstersInParty } = require("../../models/party.db");
const { getGameData } = require("../../models/gamedata.db");

const getPlayerData = async uid => {
	const [ partyMonsters, gameData ] = await Promise.all([
		getMonstersInParty(uid),
		getGameData(uid)
	]);

	return { partyMonsters, gameData };
};

module.exports = { getPlayerData };
