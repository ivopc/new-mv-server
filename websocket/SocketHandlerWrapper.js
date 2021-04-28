class SocketHandlerWrapper {
    constructor (socket) {
        this.socket = socket;
    }

    send (event, data) {
        this.socket.emit(event, data);
    }

    addEvent (event, fn) {
        this.socket.on(event, fn);
        return this;
    }
};

module.exports = SocketHandlerWrapper;