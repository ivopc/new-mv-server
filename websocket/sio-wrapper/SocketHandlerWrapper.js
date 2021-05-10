const url = require("url");

class SocketHandlerWrapper {
    constructor (socket) {
        this.socket = socket;
    }

    send (event, data) {
        this.socket.emit(event, data);
    }

    addEvent (event, fn) {
        this.socket.on(event, async input =>
            fn(input, await this.eventResponse(event))
        );
        return this;
    }

    async eventResponse (event) {
        return new Promise(resolve => this.socket.once(`${event}_`, resolve));
    }

    getAuth () {
        return url.parse(this.socket.request.url, true).query;
    }
};

module.exports = SocketHandlerWrapper;