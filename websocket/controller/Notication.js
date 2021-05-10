const AbstractController = require("./AbstractController");

class Notication extends AbstractController {

    getList () {}

    getMoveData () {}

    getEvolveData () {}

    getMarketPlaceData () {}

    requestLearnMove () {}

    requestEvolve () {}

    setSeen () {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.GET_NOTIFICATION_LIST, this.getList)
            .addEvent(EVENTS.GET_MOVE_NOTIFICATION, this.getMoveData)
            .addEvent(EVENTS.GET_EVOLVE_NOTIFICATION, this.getEvolveData);
    }
};

module.exports = Notication;