const { BATTLE_TYPES } = require("../../../constants/Battle");
const { booleanToInt } = require("../../../utils");

const { getCurrentDoing } = require("../../../models/current-doing.db");
const { getAllBattleInfo } = require("../../../models/battle.db");
const { handlePvPInput } = require("./vs-player-action.service.js");

const bootBattleAction = async (userId, input) => {
    const currentDoing = await getCurrentDoing(userId);
    // if player is doing a battle action
    if (currentDoing.doing_battle_action === booleanToInt(true))
        return false;
    // if is PvP
    if (currentDoing.battle_type === BATTLE_TYPES.PVP)
        return await handlePvPInput(userId, input, currentDoing.if_is_pvp_battle_id);
    // get all battle info
    return await getAllBattleInfo(currentDoing.battle_type, userId);
};

const onEnterIdle = async userId => {
    const currentDoing = await getCurrentDoing(userId);
    if (currentDoing.battle_type === BATTLE_TYPES.NONE) {
        return { battling: false };
    };
    return await getAllBattleInfo(currentDoing.battle_type, userId);
};

module.exports = { bootBattleAction, onEnterIdle };