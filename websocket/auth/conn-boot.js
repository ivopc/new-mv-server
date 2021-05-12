const { canConnect } = require("../../services/conn-auth");

const auth = async (userId, token) =>
    await canConnect(userId, token);

module.exports = { auth };