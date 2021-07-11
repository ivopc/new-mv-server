const url = require("url");

const { auth } = require("../../auth/conn-boot");

const { CAPTCHA_EVENTS_BLOCK, QUEUE_EVENTS_BLOCK, MIDDLEWARE_ACEPPT_TO_CONTINUE, MIDDLEWARE_REJECT_TO_CONTINUE } = require("../../../../constants/GameNetwork");

const fwFolderConfig = require("../../../../game-network-framework-config");

const networkControllerGamecoreEventRegister = require("../../network-controller-gamecore-event-register");
    //socketP2PControllerGamecoreEventRegister = require(`../${fwFolderConfig}/socket-p2p-controller-gamecore-event-register`);

class NetworkListener {

    static conn (socket) {
        networkControllerGamecoreEventRegister(socket);
    }

    static wsAuth () {}

    static appAuth () {}

    static async auth (req, next) {
        const { userId, token } = this.getAuth(req.url);
        let canEnter;
        try {
            canEnter = await auth(userId, token);
        } catch (err) {
            next(true);
            throw new Error(err);
        };
        next(canEnter ? MIDDLEWARE_ACEPPT_TO_CONTINUE : MIDDLEWARE_REJECT_TO_CONTINUE);
    }

    static async emit (req, next) {
        const { event, url } = req;
        if (!EVENTS.includes(event))
            return;
        const { userId } = this.getAuth(url);
        if (CAPTCHA_EVENTS_BLOCK.includes(event)) {
            const isCaptchaOpenned = await isCaptchaOpennedInClient(userId);
            console.error("esse evento é bloqueado pelo captcha!", event);
            //next(new Error("Vai tomar no cu ta tendando hackear caralho"));
            //return;
        };
        if (QUEUE_EVENTS_BLOCK.includes(event)) {
            const isRunning = await isQueuedBehaviorRunning(userId);
            if (!isRunning) {
                console.error("Action Queue behavior is in execution");
                // next(new Error("Vai toma no cu caralho tem q esperar a ação ser executada fdp"));
                return;
            };
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

    static getAuth (params) { // {placeholder}
        return url.parse(params, true).query;
    } 
};

module.exports = NetworkListener;