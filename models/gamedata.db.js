const QueryExecutor = require("../database/MySQLQueryExecutor");

const insertGameData = async uid => {
    return await QueryExecutor.query("INSERT INTO `in_game_data` SET ?", {
        uid,
        silver: 100,
        gold: 0,
        points: 0,
        level: 0,
        rank: 0,
        exp: 0
    });
};

const getGameData = async uid => {
    const [ gameData ] = await QueryExecutor.query(
        "SELECT `silver`, `gold`, `points`, `level`, `rank`, `exp` FROM `in_game_data` WHERE `uid` = ?",
         [uid]
    );
    return gameData;
};

module.exports = { insertGameData, getGameData };