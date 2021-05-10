const AbstractController = require("./AbstractController");

class Player extends AbstractController {
    connect () {}

    disconnect () {}

    pong (_, response) {
        response(null, true);
    }

    setSkin (data, response) {}

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
            .addEvent(EVENTS.GET_MONSTERS, this.getMonsters)
            .addEvent(EVENTS.GET_PLAYER_DATA, this.getPlayerData)
            .addEvent(EVENTS.DISCONNECT, this.disconnect);
    }
};

module.exports = Player;