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
            .addEvent(EVENTS.PING, (input, response) => this.pong(response))
            .addEvent(EVENTS.CHANGE_SKIN, (input, response) => this.setSkin(input, response))
            .addEvent(EVENTS.REQUEST_SELF_PROFILE_DATA, (input, response) => this.getSelfProfile(input, response))
            .addEvent(EVENTS.REQUEST_PROFILE_DATA, (input, response) => this.getRemoteProfile(input, response))
            .addEvent(EVENTS.GET_MONSTERS, (input, response) => this.getMonsters(input, response))
            .addEvent(EVENTS.GET_PLAYER_DATA, (input, response) => this.getPlayerData(input, response))
            .addEvent(EVENTS.DISCONNECT, () => this.disconnect());
    }
};

module.exports = Player;