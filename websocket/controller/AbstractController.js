class AbstractController {

	constructor (socket, userId) {
		this.socket = socket;
		this.userId = userId;
	}

	registerEvents () {}
};

module.exports = AbstractController;