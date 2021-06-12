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

    addAjaxEvent (event, fn) {
        return this.addEvent(event, fn);
    }

    getAuth () {
        return url.parse(this.socket.request.url, true).query;
    }

    get id () {
        return this.socket.id;
    }
};

module.exports = SocketHandlerWrapper;