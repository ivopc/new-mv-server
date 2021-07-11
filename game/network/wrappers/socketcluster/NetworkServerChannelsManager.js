const { CHANNELS } = require("./../../../../constants/GameNetwork");

class NetworkServerChannelsManager {

    static setServer (server) {
        this.server = server;
    }

    static publishToEveryOne (data) {
        this.server.exchange.publish(CHANNELS.GLOBAL(), data);
    }

    static publishToPlayer (userId, data) {
        this.server.exchange.publish(CHANNELS.PLAYER(userId), data);
    }

    static publishToLevel (levelId, data) {
        this.server.exchange.publish(CHANNELS.LEVEL(levelId), data);
    }

    static publishToPvPBattle (battleId, data) {
        this.server.exchange.publish(CHANNELS.PVP_BATTLE(battleId), data);
    }
};

module.exports = NetworkServerChannelsManager;