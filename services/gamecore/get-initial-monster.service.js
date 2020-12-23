const { getFlag, insertUpdateFlag } = require("../../models/flags.db");
const { insertMonster } = require("../../models/monster.db");

// checking if have initial monster according to the key action flag
const hasInitial = async uid => {
    return await getFlag(uid, "ka", 1);
};

const insertInitialMonsterFlag = async uid => {
    const 
        type = "ka",
        flagId = 1,
        value = 1;
    return await insertUpdateFlag(uid, type, flagId, value);
};

const giveInitialMonster = async (uid, monsterData) => {
    return await insertMonster(uid, {
        ... monsterData, 
        ... {is_initial: true, trade_enabled: false} 
    });
};

module.exports = { hasInitial, insertInitialMonsterFlag, giveInitialMonster };