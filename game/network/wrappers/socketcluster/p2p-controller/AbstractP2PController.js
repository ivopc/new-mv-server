class AbstractP2PController {
    constructor (req, next) {
        this.req = req;
        this.next = next;
    }

    fetchAndRun (eventName) {}
};

module.exports = AbstractP2PController;