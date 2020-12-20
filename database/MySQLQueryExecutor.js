const Connection = require("./MySQLConnection");

class QueryExecutor {
    static async query () {
        const conn = await Connection.getConn();
        const query = conn.query( ... arguments);
        const rows = [];
        return new Promise((resolve, reject) =>
            query
                .on("result", row => rows.push(row))
                .on("error", err => reject(err))
                .on("end", () => {
                    conn.release();
                    resolve(rows);
                })
        );
    }
};

module.exports = QueryExecutor;