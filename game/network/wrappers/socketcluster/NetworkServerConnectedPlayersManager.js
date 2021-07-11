const { CHANNELS } = require("./../../../../constants/GameNetwork");

class NetworkServerConnectedPlayersManager {

    static setServer (server) {
        this.server = server;
    }

    static disconnect (id) {
        this.server.clients[id].disconnect();
    }
};

module.exports = NetworkServerConnectedPlayersManager;