class AbstractController {

    constructor (socket, userId) {
        this.socket = socket;
        this.userId = userId;
        this.session;
    }

    setSession (sessionObject) {
        this.session = sessionObject;
    } 

    registerEvents () {}
};

module.exports = AbstractController;