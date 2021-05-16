const { getFlag, insertUpdateFlag } = require("../../models/flags.db");
const { insertMonster } = require("../../models/monster.db");

// checking if have initial monster according to the key action flag
const hasInitial = async userId => await getFlag(userId, "ka", 1);

const insertInitialMonsterFlag = async userId => {
    const 
        type = "ka",
        flagId = 1,
        value = 1;
    return await insertUpdateFlag(userId, type, flagId, value);
};

const giveInitialMonster = async (userId, monsterData) => {
    return await insertMonster(userId, {
        ... monsterData, 
        ... {is_initial: true, trade_enabled: false} 
    });
};

module.exports = { 
    hasInitial, 
    insertInitialMonsterFlag, 
    giveInitialMonster 
};