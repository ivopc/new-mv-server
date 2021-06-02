const { insertMonster } = require("../../models/monster.db");
const { getFreeSpaceInParty, setMonsterToPosition } = require("../../models/party.db");
const { booleanToInt } = require("../../utils");

const insertMonsterReadyToUse = async (userId, monsterData) => {
    // check if there's space in party, if not set the `in_party` attr to false
    // cause if have space return a number with the free space
    // if not return a false boolean
    monsterData.user_id = userId;
    const partyFreeSpace = await getFreeSpaceInParty(userId);
    monsterData.in_party = booleanToInt(partyFreeSpace !== false);
    const insertedMonsterData = await insertMonster(monsterData);
    if (typeof partyFreeSpace === "number") {
        await setMonsterToPosition(userId, insertedMonsterData.insertId, partyFreeSpace);
    };
};

module.exports = { insertMonsterReadyToUse };