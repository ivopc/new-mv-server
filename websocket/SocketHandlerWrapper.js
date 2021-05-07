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
        // arrumar isso depois, até buguei aki pq to com muito sono
        this.socket.on(event, (input, response) => 
            fn(input, this.eventResponse(response))
        );
        return this;
    }

    eventResponse (response) {
        return response;
    }

    getAuth () {
        return url.parse(this.socket.request.url, true).query;
    }
};

module.exports = SocketHandlerWrapper;