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
        this.socket
            .on(EVENTS.PING, () => this.ping())
            .on(EVENTS.CHANGE_SKIN, (input, response) => this.changeSkin(input))
            .on(EVENTS.REQUEST_SELF_PROFILE_DATA, (_, response) => this.getSelfProfile())
            .on(EVENTS.REQUEST_PROFILE_DATA, (input, response) => this.getRemoteProfile(input))
            .on(EVENTS.GET_MONSTERS, (input, response) => this.getMonsters(input))
            .on(EVENTS.GET_PLAYER_DATA, (_, response) => this.getSelfPlayerData(_, response))
            .on(EVENTS.DISCONNECT, () => this.disconnect());
    }
};

module.exports = AbstractController;