const AbstractController = require("./AbstractController");

class Bag extends AbstractController {

	useItem (input, response) {}

    registerEvents () {
    	this.socket
    		.addEvent(EVENTS.USE_ITEM, (input, response) => this.useItem(input, response));
    }
};

module.exports = Bag;