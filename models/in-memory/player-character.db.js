/**
 * @typedef {{userId: number, x: number, y: number, facing: number, character: number}} PlayerCharacterData
 */

async function create (userId) {
    const { x, y, z, facing, sprite } = await getCharacterData(userId);
    return { x, y, z, facing, sprite };
};

function walk (direction, characterObject) {
    switch (direction) {
        case "up": {
            characterObject.y --;
            break;
        };
        case "right": {
            characterObject.x ++;
            break;
        };
        case "down": {
            characterObject.y ++;
            break;
        };
        case "left": {
            characterObject.x --;
            break;
        };
    }
};

 const { PlayerCharacter } = require("../../database/nedb");

/**
 * Insert player character in `PlayerCharacter` storage.
 * @function
 * @param {PlayerCharacterData} data
 */
 const insertPlayerCharacterCacheData = data => PlayerCharacter.insert(data);

 /** Get data from `PlayerCharacter` storage.
  * @function 
  * @returns {Promise<PlayerCharacterData>} 
  */
 const getPlayerCharacterCacheData = () => PlayerCharacter.findOne({});
 
 /**
  * Generic `PlayerCharacter` storage updater.
  * @function
  * @return {Promise<void>}
  */
 const updatePlayerCharacterCacheData = data => PlayerCharacter.update({}, data);
 
 module.exports = { insertPlayerCharacterCacheData, getPlayerCharacterCacheData, updatePlayerCharacterCacheData };