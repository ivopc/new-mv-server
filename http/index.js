const 
    express = require("express"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); 

const routes = {
    main: require("./routes/main"),
    account: require("./routes/account"),
    dashboard: require("./routes/dashboard")
};

app
    .use(express.static(__dirname + "/public"))
    .use(cookieParser())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(expressSession({
        secret: "h78oDS78KNCXJK0vbkifd8V349fvds7" + Date.now(),
        name: "sessid",
        resave: false,
        saveUninitialized: false
    }));

app
    .use("/", routes.main)
    .use("/account", routes.account)
    .use("/dashboard", routes.dashboard);

module.exports = app;