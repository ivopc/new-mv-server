const r = require("rethinkdb");

const Connection = require("./RethinkDBConnection");
const { TABLES } = require("../constants/RethinkDB");

class CharacterCRUD {
    static async create (characterData) {
        const conn = await Connection.getConn();
        await r.table(TABLES.CHARACTER)
            .insert([ characterData ])
            .run(conn);
        Connection.closeConn(conn);
    }

    static async read (userId, _conn) {
        const conn = _conn ? _conn : await Connection.getConn();
        const cursor = await r.table(TABLES.CHARACTER)
            .filter(r.row("user_id").eq(+userId))
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

// create(characterData) =
// user_id,
// nickname: req.body["nickname"],
// online: false,
// sprite: 2,
// level: default_init.position.level,
// pos_x: default_init.position.x,
// pos_y: default_init.position.y,
// pos_facing: default_init.position.facing

// ** cheatsheet

// r.connect({
//     host: "localhost",
//     port: 28015
// }, (err, conn) => {
    // ** cria tabela
    // r.tableCreate("character_data").run(conn, (err, data) => {
    //     console.log(data);
    // });

    // limpa db
    //r.db("test").tableDrop("character_data").run(conn, () => console.log("limpou!"));

    // ** inserir na tabela
    // r.table("character_data").insert([
    //     {
    //         user_id: 1,
    //         nickname: "Ivopc",
    //         level: 3,
    //         online: true,
    //         pos_x: 29,
    //         pos_y: 21,
    //         pos_facing: 0,
    //         sprite: 2
    //     }
    // ]).run(conn, (err, data) => {
    //     console.log(data);
    // });

    // ** buscar valores
    // r.table("character_data").filter(r.row("user_id").eq(1)).run(conn, (err, cursor) => {
    //         cursor.toArray((err, data) => {
    //             console.log(data[0]);
    //         });
    // });

    //** update
    // r.table("character_data").
    // filter(r.row("user_id").eq(1)).
    // update({pos_x: 2}).
    // run(conn, function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    // });

    // ** update add (increment)
    // r.table("character_data").
    // filter(r.row("user_id").eq(1)).
    // update({pos_y: r.row("pos_y").add(1)}).
    // run(conn, (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    // });

    // ** update menos (substact)
    // r.table("character_data").
    // filter(r.row("user_id").eq(1)).
    // update({pos_y: r.row("pos_y").sub(1)}).
    // run(conn, (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    // });

    // ** deletar
    // r.table("character_data")
    //     .filter(r.row("user_id").eq(1))
    //     .delete()
    //         .run(conn, (err, data) => {
    //            console.log(data); 
    //         });

    // ** pegar todos
    // r.table("character_data").run(conn, function(err, cursor) {
    //     if (err) throw err;
    //     cursor.toArray(function(err, result) {
    //         if (err) throw err;
    //         console.log(JSON.stringify(result, null, 2));
    //     });
    // });

module.exports = CharacterCRUD;