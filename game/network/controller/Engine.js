const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../../constants/GameNetwork");

const { EventEmitter } = require("events");

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(0);

const layoutBuilder = require("../../../../mv-engine/layout-builder")(eventEmitter);

class Engine extends AbstractController {

    constructor (socket, userId) {
        super(socket, userId);
        this.watchFile();
    }

    async updateLayoutData (input, response) {
        eventEmitter.emit("FIX_LAYOUT_COMPONENT", input);
        
    }

    registerEvents () {
        this.socket
            .addAjaxEvent(EVENTS.RECEIVE_NEW_LAYOUT_DATA, this.updateLayoutData, this);
    }

    watchFile () {
        eventEmitter.on("UPDATE_LAYOUT", layout => this.socket.send(EVENTS.UPDATE_LAYOUT, layout));
    }
};

module.exports = Engine;