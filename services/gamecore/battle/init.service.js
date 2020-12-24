const { BATTLE_TYPES } = require("../../../constants/Battle");

const { getCurrentDoing } = require("../../../models/current-doing.db");
const { getAllBattleInfo } = require("../../../models/battle.db");
const { handlePvPInput } = require("./vs-player-action.service.js");

const getInitialBattleData = async (uid, input) => {
    const currentDoing = await getCurrentDoing(uid);
    // if player is doing a battle action
    if (currentDoing.doing_battle_action === 1)
        return false;
    // if is PvP
    if (currentDoing.battle_type == BATTLE_TYPES.PVP)
        return await handlePvPInput(uid, input, currentDoing.if_is_pvp_battle_id);
    // get all battle info
    return await getAllBattleInfo(currentDoing.battle_type, uid);
};

module.exports = { getInitialBattleData };