const 
    express = require("express"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    cors = require("cors");

const forceSession = require("./controller/utils/force-session");

const TEST = true;

const app = express();

app.set("port", process.env.PORT || 8081);
app.set("view engine", "ejs");
app.set("views", "./views"); 

// routers
const routes = {
    main: require("./routes/main"),
    account: require("./routes/account"),
    dashboard: require("./routes/dashboard"),
    gamecore: require("./routes/gamecore")
};
app
    .use(express.static("./public"))
    .use(cookieParser())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(expressSession({
        secret: "h78oDS78KNCXJK0vbkifd8V349fvds7",
        name: "sessid",
        resave: false,
        saveUninitialized: false
    }));


if (TEST) {
    app
        .use(cors())
        .use(forceSession);
};

app
    .use("/", routes.main)
    .use("/account", routes.account)
    .use("/dashboard", routes.dashboard)
    .use("/gamecore", routes.gamecore);

app.listen(app.get("port"), () => 
    console.log(`Monster Valle is running on port ${app.get("port")}`)
);