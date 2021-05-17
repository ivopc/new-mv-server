const r = require("rethinkdb");

const Connection = require("./RethinkDBConnection");
const { TABLES } = require("../constants/RethinkDB");

class CharacterCRUD {
    static async create (playerData) {
        const conn = await Connection.getConn();
        await r.table(TABLES.CHARACTER)
            .insert([ playerData ])
            .run(conn);
        Connection.closeConn(conn);
    }

    static async read (userId, _conn) {
        const conn = _conn ? _conn : await Connection.getConn();
        const cursor = await r.table(TABLES.CHARACTER)
            .filter(r.row("user_id").eq(userId))
            .run(conn);
        const [ parsedData ] = await cursor.toArray();
        Connection.closeConn(conn);
        return parsedData;
    }

    static async update (userId, updateObject) {
        const conn = await Connection.getConn();
        await r.table(TABLES.CHARACTER)
            .filter(r.row("user_id").eq(+userId))
            .update(updateObject)
                .run(conn);
        Connection.closeConn(conn);
    }

    static async delete () {}
};

// create(playerData) =
// user_id,
// nickname: req.body["nickname"],
// online: false,
// sprite: 2,
// level: default_init.position.level,
// pos_x: default_init.position.x,
// pos_y: default_init.position.y,
// pos_facing: default_init.position.facing

module.exports = CharacterCRUD;