const { authConnection } = require("../../../services/conn-auth");

const auth = async (userId, token) =>
    await authConnection(userId, token);

module.exports = { auth };