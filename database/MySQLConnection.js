const mysql = require("mysql");
const config = require("./dbconfig.json");

class Connection {
    constructor () {
        this.mysqlConn = mysql.createPool(config.mysql);
    }

    async getConn () {
        return new Promise((resolve, reject) => 
            this.mysqlConn.getConnection((err, conn) => {
                if (err)
                    return reject(err);
                resolve(conn);
            })
        );
    }
};

module.exports = new Connection();