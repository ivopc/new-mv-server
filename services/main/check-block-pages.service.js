const BLOCKPAGES = require("../../constants/BlockPages");

const { getFlag } = require("../../models/flags.db");
const { isBattling } = require("../../models/current-doing.db");

const checkBlockPages = async uid => {
    const [ hasInitial, isPlayerBattling, captcha ] = await Promise.all([
        getFlag(uid, "ka", 1),
        isBattling(uid)
    ]);

    if (!hasInitial)
        return BLOCKPAGES.INITIAL_MONSTER;

    if (isPlayerBattling)
    	return BLOCKPAGES.BATTLING;
};

module.exports = { checkBlockPages };