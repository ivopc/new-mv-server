const r = require("rethinkdb");
const config = require("./dbconfig.json");

class Connection {
    static async getConn () {
        let conn;
        try {
            conn = await r.connect(config);
        } catch (err) {
            throw new Error(err); 
        };
        return conn;
    }

    static closeConn (connection) {
        connection.close();
    }
};

module.exports = Connection;