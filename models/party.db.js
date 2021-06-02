const QueryExecutor = require("../database/MySQLQueryExecutor");
const { getMonster } = require("./monster.db");
const { escapeSQLQuery } = require("../utils");

const insertMonsterParty = async userId => {
    return await QueryExecutor.query("INSERT INTO `monsters_in_party` SET ?", {
        user_id: userId,
        monster0: 0,
        monster1: 0,
        monster2: 0,
        monster3: 0,
        monster4: 0,
        monster5: 0
    });
};

// get free space in party (complement to add new monsters to player party)
const getFreeSpaceInParty = async userId => {
    // get monsters id in the player party
    const [ monstersInParty ] = await QueryExecutor.query(
        "SELECT `monster0`, `monster1`, `monster2`, `monster3`, `monster4`, `monster5` FROM `monsters_in_party` WHERE `user_id` = ?",
        [userId]
    );
    let freeSpace;
    // iterating the monster party to find the freespace
    for (let i = 0; i < 6; i ++) {
        if (monstersInParty["monster" + i] === 0) {
            freeSpace = i;
            break;
        } else {
            freeSpace = false;
        };
    };
    return freeSpace;
};

// get all monsters in party
const getMonstersInParty = async userId => {
    // get monsters id in the player party
    const [ monstersInParty ] = await QueryExecutor.query(
        "SELECT `monster0`, `monster1`, `monster2`, `monster3`, `monster4`, `monster5` FROM `monsters_in_party` WHERE `user_id` = ?",
        [userId]
    );
    // create function list to store the monster in party data getting async
    const fns = [];
    for (let i = 0; i < 6; i ++) {
        fns[i] = async () => {
            if (monstersInParty["monster" + i]) {
                return await getMonster(monstersInParty["monster" + i]);
            } else {
                return Promise.resolve(null);
            };
        };
    };
    // get the monster data and returns an array with all monsters in party data
    const monsterList = await Promise.all(fns.map(fn => fn()));
    // removing the null elements
    return monsterList.filter(el => !!el);
};

const setMonsterToPosition = async (userId, monsterId, position) => {
    return await QueryExecutor.query(
        `UPDATE \`monsters_in_party\` SET \`monster${escapeSQLQuery(position)} = ? WHERE \`user_id\` = ?`,
        [monsterId, userId]
    );
};

module.exports = {
    insertMonsterParty,
    getFreeSpaceInParty, 
    getMonstersInParty,
    setMonsterToPosition
};