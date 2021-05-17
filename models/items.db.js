const QueryExecutor = require("../database/MySQLQueryExecutor");

const insertItem = async () => {};

const getItem = async () => {};

const getAllItems = async userId => 
    await QueryExecutor.query("SELECT `item_id`, `amount` FROM `items` WHERE `user_id` = ?", [userId]);

const useItem = async () => {};

const equipItem = async () => {};

const discontItem = async () => {};

const checkIfHaveItem = async () => {};

module.exports = {
    insertItem,
    getItem,
    getAllItems,
    useItem,
    equipItem,
    discontItem,
    checkIfHaveItem
};