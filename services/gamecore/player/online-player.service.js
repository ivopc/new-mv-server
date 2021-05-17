const CharacterCrud = require("../../../database/RethinkDBCharacterCrud");

const setPlayerOnline = async (userId, isOnline) =>
    await CharacterCrud.update(userId, {online: isOnline});

module.exports = { setPlayerOnline };