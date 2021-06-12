/**
 * @typedef {{userId: number, x: number, y: number, facing: number, character: number}} PlayerCharacterData
 */

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