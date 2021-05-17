const r = require("rethinkdb");
const RethinkConnection = require("../database/RethinkDBConnection");

const { TABLES } = require("../constants/RethinkDB");

const getActivePlayersInLevel = async (notUserId, levelId) => {
    const conn = await RethinkConnection.getConn();
    const cursor = r.table(TABLES.CHARACTER)
        .filter(r.row("level").eq(levelId))
        .filter(r.row("online").eq(true))
        // dont include the player himself
        .filter(r.row("user_id").ne(notUserId))
            .run(conn);
        const parsedData = await cursor.toArray();
        return parsedData;
};

module.exports = { getActivePlayersInLevel };