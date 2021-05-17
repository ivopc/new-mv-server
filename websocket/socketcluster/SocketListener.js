const url = require("url");

const { auth } = require("./../auth/conn-boot");

const fwFolderConfig = require("./../../frameworkConfig");

const 
    socketControllerGamecoreEventRegister = require("./../socket-controller-gamecore-event-register"),
    socketP2PControllerGamecoreEventRegister = require(`../${fwFolderConfig}/socket-p2p-controller-gamecore-event-register`);

class SocketListener {

    static conn (socket) {
        socketControllerGamecoreEventRegister(socket);
    }

    static async auth (req, next) {
        const { userid, token } = url.parse(req.url, true).query;
        let canEnter;
        try {
            canEnter = await auth(userid, token);
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

    static emit (req, next) {}

    static subscribe (req, next) {}

    static publishIn (req, next) {
        socketP2PControllerGamecoreEventRegister(req, next);
    }

    static publishOut (req, next) {}
};

module.exports = SocketListener;