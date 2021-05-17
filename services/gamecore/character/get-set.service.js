const CharacterCrud = require("../../../database/RethinkDBCharacterCrud");

const getPlayerCharacterData = async userId => await CharacterCrud.read(userId);

const setPlayerCharacterData = async (userId, updateObject) => {};


module.exports = { getPlayerCharacterData, setPlayerCharacterData };