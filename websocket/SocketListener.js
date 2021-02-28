const socketEmitGamecoreEventRegister = require("./socket-event-register");

class SocketListener {

    static conn (socket) {
        socketEmitGamecoreEventRegister(socket);
    }

    static async auth (input) {}

    static async emit (input) {}

    static async subscribe (input) {}

    static async publishIn (input) {}

    static async publishOut (input) {}
};

module.exports = SocketListener;