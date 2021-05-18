const QueryExecutor = require("../database/MySQLQueryExecutor");

const { NOTIFICATION_PER_PAGE } = require("../constants/Notification");

const { sanatizeQuery } = require("../utils");

const getNotifications = async (userId, input) => {
    input = input || {};
    let { page } = input;
    page = page || 1;
    const startingLimit = (page - 1) * NOTIFICATION_PER_PAGE;
    return await Promise.all([
        QueryExecutor.query(
            "SELECT * FROM `notification` WHERE `enabled` = '1' AND `user_id` = ? ORDER BY `id` DESC LIMIT " + sanatizeQuery(startingLimit) + ", " + sanatizeQuery(NOTIFICATION_PER_PAGE),
            [userId]
        ),
        QueryExecutor.query(
            "SELECT COUNT(*) FROM `notification` WHERE `viewed` = '0' AND `user_id` = ?",
            [userId]
        )
    ]);
};

const getNotificationsRaw = async userId => {};

module.exports = { getNotifications, getNotificationsRaw };