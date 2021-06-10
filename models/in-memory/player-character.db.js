/**
 * @typedef {{userId: number, x: number, y: number, facing: number, character: number}} PlayerCharacterData
 */

 const { PlayerCharacter } = require("../../database/nedb");

/**
 * Insert player character in `PlayerCharacter` storage.
 * @function
 * @param {PlayerCharacterData} data
 */
 const insert = data => PlayerCharacter.insert(data);

 /** Get data from `PlayerCharacter` storage.
  * @function 
  * @returns {Promise<PlayerCharacterData>} 
  */
 const get = () => PlayerCharacter.findOne({});
 
 /**
  * Generic `PlayerCharacter` storage updater.
  * @function
  * @return {Promise<void>}
  */
 const update = data => PlayerCharacter.update({}, data);
 
 module.exports = { insert, get, update };