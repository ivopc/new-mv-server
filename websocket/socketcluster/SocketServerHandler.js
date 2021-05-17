const { CHANNELS } = require("./../../constants/GameNetwork");

class SocketServerHandler {
    constructor (server) {
        this.server = server;
    }

    publishToEveryOne (data) {
        this.server.exchage.publish(CHANNELS.GLOBAL(), data);
    }

    publishToPlayer (userId, data) {
        this.server.exchage.publish(CHANNELS.USERS(userId), data);
    }

    publishToLevel (levelId, data) {
        this.server.exchage.publish(CHANNELS.LEVEL(levelId), data);
    }

    disconnect (id) {
        this.server.clients[id].disconnect;
    }

    static ref
};

module.exports = SocketServerHandler;