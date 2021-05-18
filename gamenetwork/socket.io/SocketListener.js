const socketEmitGamecoreEventRegister = require("./socket-emit-gamecore-event-register");

class SocketListener {

    static conn (socket) {
        socketEmitGamecoreEventRegister(socket);
    }

    static auth (req, next) {}

    static emit (req, next) {}

    static subscribe (req, next) {}

    static publishIn (req, next) {}

    static publishOut (req, next) {}
};

module.exports = SocketListener;