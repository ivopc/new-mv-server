const nedb = require("nedb-promises");

const Session = nedb.create();
const PlayerCharacter = nedb.create();

module.exports = { Session, PlayerCharacter };