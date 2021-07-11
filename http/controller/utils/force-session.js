const Login = require("./../account/classes/Login");


module.exports = (req, res, next) => {
    if (!req.session["isConnected"]) {
        const login = new Login(req, res);
        login.createSession({
            id: 1,
            username: "Ivopc",
            rank: 0,
            lang: 0
        });
    };

    next();
};