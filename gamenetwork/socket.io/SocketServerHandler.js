const { CHANNELS } = require("./../../constants/GameNetwork");

const io = require("socket.io");

class SocketServerHandler {

    publishToEveryOne (data) {
        io.to(CHANNELS.GLOBAL()).emit(data);
    }

    publishToPlayer (playerId, data) {
        io.to(CHANNELS.USERS(playerId)).emit(data);
    }

    publishToLevel (levelId, data) {
        io.to(CHANNELS.LEVEL(levelId)).emit(data);
    }

    static ref
};

module.exports = SocketServerHandler;