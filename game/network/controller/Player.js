const AbstractController = require("./AbstractController");

const fwFolderConfig = require("../../../frameworkConfig");

const SocketServerHandler = require(`../wrappers/${fwFolderConfig}/SocketServerHandler`);

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
            SocketServerHandler.ref.disconnect(isAlreadyConnected.socketId);
            return;
        };
        const initialData = await prepareInitialData(this.userId);
        this.socket.send(EVENTS.START_GAMECLIENT, initialData);
        await SocketServerHandler.ref.setPvPBattleData(999, {test: 123});
        console.log("battle data", await SocketServerHandler.ref.getPvPBattleData(999));
    }

    disconnect () {}

    async pong (input, response) {
        console.log("character data", await getCharacterData());
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
            .addAjaxEvent(EVENTS.PING, this.pong.bind(this))
            .addAjaxEvent(EVENTS.REQUEST_SELF_PROFILE_DATA, this.getSelfProfile.bind(this))
            .addAjaxEvent(EVENTS.REQUEST_PROFILE_DATA, this.getRemoteProfile.bind(this))
            .addAjaxEvent(EVENTS.GET_MONSTERS_ITEMS, this.getMonsters.bind(this))
            .addAjaxEvent(EVENTS.GET_PLAYER_DATA, this.getPlayerData.bind(this))
            .addEvent(EVENTS.DISCONNECT, this.disconnect.bind(this));
    }
};

module.exports = Player;