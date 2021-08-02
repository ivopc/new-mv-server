const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../../constants/GameNetwork");

const { EventEmitter } = require("events");

const em = new EventEmitter();
em.setMaxListeners(0);

const layoutBuilder = require("../../../../mv-engine/layout-builder")(em);

class Engine extends AbstractController {

    constructor (socket, userId) {
        super(socket, userId);
        this.watchFile();
    }

    async updateLayoutData (input, response) {

    }

    registerEvents () {
        this.socket
            .addAjaxEvent(EVENTS.RECEIVE_NEW_LAYOUT_DATA, this.updateLayoutData, this);
    }

    watchFile () {
        em.on("UPDATE_LAYOUT", layout => this.socket.send(300, layout));
    }
};

module.exports = Engine;