const AbstractController = require("./AbstractController");

const fwFolderConfig = require("../../../game-network-framework-config");

const NetworkServerConnectedPlayersManager = require(`../wrappers/${fwFolderConfig}/NetworkServerManager`);

const { 
    playerConnect, 
    prepareInitialData,
    getCharacterData
} = require("../../../services/gamecore/player/init-connection.service");

const { EVENTS } = require("../../../constants/GameNetwork");

class Player extends AbstractController {
    async connect () {
        const { isAlreadyConnected } = await playerConnect(this.userId);
        if (isAlreadyConnected) {
            NetworkServerConnectedPlayersManager.disconnect(isAlreadyConnected.socketId);
            return;
        };
        const gamebootData = await prepareInitialData(this.userId);
        this.socket.send(EVENTS.START_GAMECLIENT, gamebootData);
    }

    disconnect () {}

    async pong (input, response) {
        response();
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
            .addAjaxEvent(EVENTS.PING, this.pong, this)
            .addAjaxEvent(EVENTS.REQUEST_SELF_PROFILE_DATA, this.getSelfProfile, this)
            .addAjaxEvent(EVENTS.REQUEST_PROFILE_DATA, this.getRemoteProfile, this)
            .addAjaxEvent(EVENTS.GET_MONSTERS_ITEMS, this.getMonsters, this)
            .addAjaxEvent(EVENTS.GET_PLAYER_DATA, this.getPlayerData, this)
            .addEvent(EVENTS.DISCONNECT, this.disconnect, this);
    }
};

module.exports = Player;