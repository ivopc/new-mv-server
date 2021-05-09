class SocketServerHandler {
    constructor (server) {
        this.server = server;
    }

    publishToEveryOne (data) {
        this.server.exchage.publish(CHANNELS.GLOBAL, data);
    }

    publishToPlayer (userId, data) {
        this.server.exchage.publish(`u${userId}`, data);
    }

    publishToLevel (levelId, data) {
        this.server.exchage.publish(`l${levelId}`, data);
    }

    static ref
};

module.exports = SocketServerHandler;