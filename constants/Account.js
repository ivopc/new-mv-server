const LOGIN = {
	ERROR: {
		LENGTH: 1,
		USER_PASSWORD_INVALID: 2,
		USER_BANNED: 3,
		INTERNAL_ERROR: 4
	}
};

const REGISTER = {
	ERROR: {
		INVALID_INPUT: 1,
		USER_ALREADY_EXISTS: 2,
		EMAIL_ALREADY_IN_USE: 3
	}
};

module.exports = { LOGIN, REGISTER };