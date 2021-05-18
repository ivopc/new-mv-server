const AbstractController = require("./AbstractController");

const fwFolderConfig = require("../../frameworkConfig");

const SocketServerHandler = require(`../${fwFolderConfig}/SocketServerHandler`);

const { 
    playerConnect, 
    prepareInitialData 
} = require("../../services/gamecore/player/init-connection.service");

const { EVENTS } = require("../../constants/GameNetwork");

class Player extends AbstractController {
    async connect () {
        const { isAlreadyConnected } = await playerConnect(this.userId);
        if (isAlreadyConnected) {
            SocketServerHandler.ref.disconnect(isAlreadyConnected.socketId);
        };
        const initialData = await prepareInitialData(this.userId);
        this.socket.send(EVENTS.START_GAMECLIENT, initialData);
    }

    disconnect () {}

    pong (_, response) {
        response(null, null);
    }

    getSelfProfile () {}

    getRemoteProfile () {}

    getPlayerData () {}

    async getMonsters (input, response) {
        let monsters;
        try {
            monsters = await getMonstersInParty(this.userId);
        } catch (err) {
            const _err = new Error(err);
            _err.name = ERRORS.CANT_GET_MONSTER;
            response(_err);
            throw _err;
        };
        response(null, monsters);
    }

    registerEvents () {
        this.connect();
        this.socket
            .addEvent(EVENTS.PING, this.pong)
            .addEvent(EVENTS.CHANGE_SKIN, this.setSkin)
            .addEvent(EVENTS.REQUEST_SELF_PROFILE_DATA, this.getSelfProfile)
            .addEvent(EVENTS.REQUEST_PROFILE_DATA, this.getRemoteProfile)
            .addEvent(EVENTS.GET_MONSTERS_ITEMS, this.getMonsters)
            .addEvent(EVENTS.GET_PLAYER_DATA, this.getPlayerData)
            .addEvent(EVENTS.DISCONNECT, this.disconnect);
    }
};

module.exports = Player;