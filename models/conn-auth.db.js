const QueryExecutor = require("../database/MySQLQueryExecutor");

/*boolean that returns if the player can connect with gameclient to server 
according to his token and user id input*/
const canConnect = async (userId, token) => {
    const [ canEnter ] = await QueryExecutor.query(
        "SELECT `active` FROM `security_tokens` WHERE `user_id` = ? AND token = ?",
        [userId, token]
    );
    if (!canEnter)
    	return false;
    return !!canEnter.active;
};


module.exports = { canConnect };