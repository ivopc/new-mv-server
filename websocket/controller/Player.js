const AbstractController = require("./AbstractController");

class Player extends AbstractController {
    connect () {}

    disconnect () {}

    ping () {}

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

    getItem () {}

    changeSkin (input) {}

    getSelfPlayerData () {}

    getSelfProfile () {}

    getRemoteProfile () {}

    registerEvents () {
        this.connect();
        this.socket
            .addEvent(EVENTS.PING, () => this.ping())
            .addEvent(EVENTS.CHANGE_SKIN, (input, response) => this.changeSkin(input))
            .addEvent(EVENTS.REQUEST_SELF_PROFILE_DATA, (_, response) => this.getSelfProfile())
            .addEvent(EVENTS.REQUEST_PROFILE_DATA, (input, response) => this.getRemoteProfile(input))
            .addEvent(EVENTS.GET_MONSTERS, (input, response) => this.getMonsters(input, response))
            .addEvent(EVENTS.GET_PLAYER_DATA, (_, response) => this.getSelfPlayerData(_, response))
            .addEvent(EVENTS.DISCONNECT, () => this.disconnect());
    }
};

module.exports = Player;