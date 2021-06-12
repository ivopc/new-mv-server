class AbstractController {

    constructor (socket, userId) {
        this.socket = socket;
        this.userId = userId;
        this.session;
    }

    registerEvents () {}
};

module.exports = AbstractController;