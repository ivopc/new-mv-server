const { canConnect } = require("./../../models/conn-auth.db");

const authConnection = async (userId, token) =>
    await canConnect(userId, token);

module.exports = { authConnection };