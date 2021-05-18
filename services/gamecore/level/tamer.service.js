const LevelData = require("../../../database/game/LevelData");

const { getTamerFlag } = require("../../../models/flags.db");

const getActiveTamersInLevel = async (userId, levelId) => {
    const level = LevelData[levelId];
    if (!level.tamers || level.tamers.length === 0)
    	return [];
    const activeTamers = level.tamers.map(tamer => 
        async () => await getTamerFlag(userId, tamer.id)
    );
    return await Promise.all(activeTamers.map(fn => fn()));
};

module.exports = { getActiveTamersInLevel };