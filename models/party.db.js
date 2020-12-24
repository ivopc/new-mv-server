const QueryExecutor = require("../database/MySQLQueryExecutor");
const { getMonster } = require("./monster.db");

const insertMonsterParty = async uid => {
    return await QueryExecutor.query("INSERT INTO `monsters_in_party` SET ?", {
        uid,
        monster0: 0,
        monster1: 0,
        monster2: 0,
        monster3: 0,
        monster4: 0,
        monster5: 0
    });
};

// get free space in party (complementar to add new monsters to player party)
const getFreeSpaceInParty = async uid => {
    // get monsters id in the player party
    const [ monstersInParty ] = await QueryExecutor.query(
        "SELECT `monster0`, `monster1`, `monster2`, `monster3`, `monster4`, `monster5` FROM `monsters_in_party` WHERE `uid` = ?",
        [uid]
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
const getMonstersInParty = async uid => {
    // get monsters id in the player party
    const [ monstersInParty ] = await QueryExecutor.query(
        "SELECT `monster0`, `monster1`, `monster2`, `monster3`, `monster4`, `monster5` FROM `monsters_in_party` WHERE `uid` = ?",
        [uid]
    );
    // create fn list to store the monster in party data getting async
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
    return new monsterList.filter(el => !!el);
};

module.exports = {
    insertMonsterParty, getFreeSpaceInParty, getMonstersInParty, 
};