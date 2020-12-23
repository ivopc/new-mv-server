const { getFlag } = require("../../models/flags.db");
const BLOCKPAGES = require("../../constants/BlockPages");

const checkBlockPages = async uid => {
    const [ hasInitial, captcha ] = await Promise.all([
        getFlag(uid, "ka", 1)
    ]);

    if (!hasInitial)
        return BLOCKPAGES.INITIAL_MONSTER;
};

module.exports = { checkBlockPages };