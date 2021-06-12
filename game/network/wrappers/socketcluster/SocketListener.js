const url = require("url");

const { auth } = require("./../../auth/conn-boot");

const { CAPTCHA_EVENTS_BLOCK } = require("./../../../../constants/GameNetwork");

const fwFolderConfig = require("./../../../../frameworkConfig");

const socketControllerGamecoreEventRegister = require("./../../socket-controller-gamecore-event-register");
    //socketP2PControllerGamecoreEventRegister = require(`../${fwFolderConfig}/socket-p2p-controller-gamecore-event-register`);

class SocketListener {

    static conn (socket) {
        socketControllerGamecoreEventRegister(socket);
    }

    static appAuth () {}

    static wsAuth () {}

    static async auth (req, next) {
        const { userId, token } = url.parse(req.url, true).query;
        let canEnter;
        try {
            canEnter = await auth(userId, token);
        } catch (err) {
            next(true);
            throw new Error(err);
        };
        if (canEnter) {
            next();
        } else {
            next(true);
        };
    }

    static emit (req, next) {
        if (CAPTCHA_EVENTS_BLOCK.includes(req.event)) {
            console.log("esse evento é bloqueado pelo captcha!", req.event);
            //next(new Error("Vai tomar no cu ta tendando hackear caralho"));
            //return;
        };
        next();
    }

    static subscribe (req, next) {
        next();

    }

    static publishIn (req, next) {
        //socketP2PControllerGamecoreEventRegister(req, next);
    }

    static publishOut (req, next) {}
};

module.exports = SocketListener;