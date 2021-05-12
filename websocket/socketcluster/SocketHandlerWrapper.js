const url = require("url");

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

    getAuth () {
        return url.parse(this.socket.request.url, true).query;
    }
};

module.exports = SocketHandlerWrapper;