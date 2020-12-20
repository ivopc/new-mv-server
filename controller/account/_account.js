const 
    _ = require("underscore"),
    async = require("async"),
    bcrypt = require("bcryptjs");


const default_init = require("./../database/default_init.json");

const PlayerData = require("./../core/playerdata.js");

// funções gerais
const General = function () {};

// criptografar senha
General.prototype.cryptPassword = function (password, next) {
    bcrypt.hash(
        password,
        10,
        next
    );
};

// checar se password é igual
General.prototype.checkPassword = function (inputPassword, inDbPassword, next) {
    bcrypt.compare(
        inputPassword,
        inDbPassword,
        next
    );
};

// gerar letras e números randômicos
General.prototype.randomString = function (len) {

    var _str = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    for (var i = 0, _rand = "", l = _str.length; i < len; i++)
        _rand += _str[Math.floor(Math.random() * l)];

    return _rand;
};

// funções de login
const Login = function (req, res) {
    this.req = req;
    this.res = res;
};

// checar se o usuário existe
Login.prototype.checkIfUserExist = function (object, callback) {
    // procurar pelo nick
    object.db.query("SELECT `id`, `nickname`, `password`, `rank`, `ban`, `lang` FROM `users` WHERE `nickname` = ?", [object.nickname], function (err, results) {
        
        // se houver resultado setar o primeiro da array para ser único, se não transf. em false
        if (results[0]) {
            results = results[0];
        } else {
            results = null;
        };

        callback(results);
    });
};

// checar se password é igual o que está na db
Login.prototype.checkPassword = function (input, inDbPassword, general, callback) {
    // ver se password é igual
    general.checkPassword(input, inDbPassword, function (err, equals) {
        callback(equals);
    }); 
};

// logar
Login.prototype.doLogin = function (req, res, data, general) {

    //gerar tokens da sessão
    const token = {
        auth: general.randomString(150),
        csrf: general.randomString(30)
    };

    // fazer a sessão
    req.session.isConnected = true;
    req.session.uid = data.id;
    req.session.nickname = data.nickname;
    req.session.authToken = token.auth;
    req.session.csrfToken = token.csrf;
    req.session.rank = data.rank;
    req.session.lang = data.lang;

    // inserir token de segurança
    req.mysqlConn.query("INSERT INTO `security_tokens` SET ?", {
        id: null,
        uid: data.id,
        active: 1,
        token: token.auth,
        lastActivity: Date.now()
    }, function () {

        // enviar resposta de sucesso ao client
        res.json({
            success: true
        });
    });
};

// funções de registro
const Register = function (req, res) {
    this.req = req;
    this.res = res;
};

// checar se usuário existe
Register.prototype.checkIfUserExist = function (nickname, db, next) {
    db.query("SELECT `nickname` FROM `users` WHERE `nickname` = ?", [nickname], function (err, results, fields) {

        console.log("results", results);
        
        // se houver resultado setar o primeiro da array para ser único
        if (results[0])
            results = results[0];

        // é objeto? então está em uso
        // é array? então não está em uso
        next(null, results.nickname ? true : false);
    });
};

// checar se o e-mail está em uso
Register.prototype.checkIfEmailInUse = function (email, db, next) {
    db.query("SELECT `email` FROM `users` WHERE `email` = ?", [email], (err, results, fields) => {
        
        // se houver resultado setar o primeiro da array para ser único
        if (results[0])
            results = results[0];
        
        // é objeto? então está em uso
        // é array? então não está em uso
        next(null, results.email ? true : false);
    });
};

// checar se captcha é igual
Register.prototype.checkCaptcha = function (input, captcha, next) {
    next(null, true);
    //next(null, input == captcha);
};

// quando os acima estiverem prontos
Register.prototype.complete = function (req, res, data) {
    //this.res.json(data);

    // se o captcha não estiver válido
    if (!data.validCaptcha) {
        res.json({error: 2});
        return;
    };

    // se o usuário existe
    if (data.userExist) {
        res.json({error: 3});
        return;
    };

    // se o e-mail estiver em uso
    if (data.emailInUse) {
        res.json({error: 4});
        return;
    };

    // declara variavel de UID
    let uid, lang;

    switch (req.cookies["lang"]) {
        case "br":
        case "en": 
        {
            lang = req.cookies["lang"];
            break;
        };

        default: {
            lang = "br";
            break;
        };
    };

    async.waterfall([
        // insere dados da conta
        next => {
            req.mysqlConn.query("INSERT INTO `users` SET ?", {
                id: null,
                confirmed: 0,
                fb_id: 0,
                reg_date: Date.now(),
                email: req.body["email"],
                nickname: req.body["nickname"],
                password: data.cryptedPassword,
                rank: 0,
                vip: 0,
                vip_date: 0,
                ban: 0,
                ban_date: 0,
                lang
            }, next);
        },
        // insere outra informações secundárias do jogo
        (results, fields, next) => {

            // pega id que foi inserido na tabela users
            uid = results.insertId;

            async.parallel({
                // o que o jogador está fazendo atualmente
                current: cb => {

                    req.mysqlConn.query("INSERT INTO `current_doing` SET ?", {
                        uid,
                        battle_type: 0,
                        if_is_pvp_battle_id: 0,
                        waiting_wild_battle: 0,
                        doing_battle_action: 0,
                        requesting_flag: 0
                    }, cb);
                },
                // informações do player: moedas, rank, level, exp
                in_game_data: cb => {

                    req.mysqlConn.query("INSERT INTO `in_game_data` SET ?", {
                        uid,
                        silver: 100,
                        gold: 0,
                        points: 0,
                        level: 0,
                        rank: 0,
                        exp: 0
                    }, cb);
                },
                // [RethinkDB] informações do player que requerem real-time
                player_data: cb => {
                    new PlayerData()
                        .insert({
                            uid,
                            nickname: req.body["nickname"],
                            online: false,
                            sprite: 2,
                            map: default_init.position.map,
                            pos_x: default_init.position.x,
                            pos_y: default_init.position.y,
                            pos_facing: default_init.position.facing
                        }, cb);
                },
                // insere flags
                flag: cb => {
                    //  Declara as funções que vão inserir as flags na DB
                    const 
                        fns = [],
                    // pega a variavel da flag
                        flags = default_init.flags;

                    // percorre a flag
                    for (let i = 0, l = flags.length; i < l; i++) {

                        // declara os parametros que vai inserir na função
                        let param = {
                            type: flags[i].type,
                            flag: flags[i].flag,
                            value: flags[i].value,
                            uid
                        };

                        // adiciona a array as funções que irão inserir as flags na db
                        fns.push(this.insertFlags.bind({
                            param,
                            db: req.mysql
                        }));
                    };

                    // insere todos os flags
                    async.parallel(fns, cb);
                },
                // monstros que estão na party
                monsters_in_pocket: cb => {
                    req.mysqlConn.query("INSERT INTO `monsters_in_pocket` SET ?", {
                        uid,
                        monster0: 0,
                        monster1: 0,
                        monster2: 0,
                        monster3: 0,
                        monster4: 0,
                        monster5: 0
                    }, cb);
                }
            }, next);
        },
        // fazer login
        (err, data) => {
            console.log(err, data);
            this.login(req, res, uid, lang);
        }
    ]);
};

// logar após registrar
Register.prototype.login = function (req, res, uid, lang) {
    var general = new General(),
    //gerar tokens da sessão
        token = {
            auth: general.randomString(150),
            csrf: general.randomString(30)
        };
    
    // fazer a sessão
    req.session.isConnected = true;
    req.session.uid = uid;
    req.session.nickname = req.body["nickname"];
    req.session.authToken = token.auth;
    req.session.csrfToken = token.csrf;
    req.session.lang = lang;

    // inserir token de segurança
    req.mysqlConn.query("INSERT INTO `security_tokens` SET ?", {
        id: null,
        uid,
        active: 1,
        token: token.auth,
        lastActivity: Date.now()
    }, function () {
        // enviar resposta de sucesso ao client
        res.json({
            success: true
        });
    });
};

// inserir dados dos flags (progresso do jogo)
Register.prototype.insertFlags = function (callback) {

    var param = this.param;

    this.db.query("INSERT INTO `flags` SET ?", {
        id: null,
        uid: param.uid,
        type: param.type,
        flag_id: param.flag,
        value: param.value
    }, callback);
};

const Config = function () {};

// mudar e-mail
Config.prototype.changeEmail = function (req, res) {

    req.checkBody("newEmail", 0).isEmail();
    req.checkBody("password", 0).len(7, 30);

    if (req.validationErrors()) {
        res.json({error: 1});
        return;
    };

    async.parallel({
        emailInUse: next => {
            new Register().checkIfEmailInUse(
                req.body["newEmail"],
                req.mysql,
                next
            );
        },
        isPasswordEquals: next => {
            req.mysqlConn.query(
                "SELECT `password` FROM `users` WHERE `id` = '" + req.session.uid + "'",
                (err, results) => {
                    new General().checkPassword(
                        req.body["password"], 
                        results[0].password, 
                        next
                    );
                }
            );
        }
    }, (err, data) => {

        // se e-mail estiver em uso
        if (data.emailInUse) {
            res.json({error: 2});
            return;
        };

        // se senha não for igual
        if (!data.isPasswordEquals) {
            res.json({error: 3});
            return;
        };

        req.mysqlConn.query(
            "UPDATE `users` SET `email` = ? WHERE `id` = '" + req.session.uid + "'", 
            [req.body["newEmail"]],
            (err, results) => {
                res.json({success: true});
            }
        );
    });
};

// mudar senha
Config.prototype.changePassword = function (req, res) {

    req.checkBody("password", 0).len(7, 30);
    req.checkBody("newPassword", 1).len(7, 30);

    if (req.validationErrors()) {
        res.json({error: 1});
        return;
    };

    // checar se senha é igual
    async.waterfall([
        next => {
            req.mysqlConn.query(
                "SELECT `password` FROM `users` WHERE `id` = '" + req.session.uid + "'",
                (err, results) => {
                    new General().checkPassword(
                        // input
                        req.body["password"],
                        // o que tá no db 
                        results[0].password, 
                        next
                    );
                }
            );
        },
        (isPasswordEquals, next) => {
            // se senha não for igual a da db
            if (!isPasswordEquals) {
                res.json({error: 2});
                return;
            };

            // trocar senha
            new General().cryptPassword(req.body["newPassword"], next);
        },
        (cryptedPassword, next) => {
            // mudar senha na db
            req.mysqlConn.query(
                "UPDATE `users` SET `password` = '" + cryptedPassword + "' WHERE `id` = '" + req.session.uid + "'",
                next
            );
        },
        () => {
            res.json({success: true});
        }
    ]);
};

// mudar linguagem
Config.prototype.changeLanguage = function (req, res) {
    
    let lang;
    
    switch (+req.body["lang"]) {
        case 1: {
            lang = "br";
            break;
        };
        case 2: {
            lang = "en";
            break;
        };
        default: {
            lang = "br";
            break;
        };
    };

    req.session.lang = lang;

    req.mysqlConn.query(
        "UPDATE `users` SET `lang` = ? WHERE `id` = ?",
        [lang, req.session.uid],
        () => {
            res.json({success: true});
        }
    );
};

// rota -> /account/login
// de login no site
exports.login = function (req, res) {

    // validando inputs
    req.checkBody("nickname", 0).len(4, 15);
    req.checkBody("password", 1).len(7, 30);

    // checando se tem erros nas inputs
    if (req.validationErrors()) {
        res.json({error: 1});
        return;
    };

    // instancia das funçoes que serao utilizadas
    var general = new General(),
        login = new Login(req, res);

    // async.waterfall([
    //     next => {
    //         login.checkIfUserExist({
    //             nickname: req.body["nickname"],
    //             db: req.mysql
    //         }, user => next(null, user));
    //     },
    //     (user, next) => {
    //         // se o usuário não existe
    //         if (!user) {
    //             res.json({error: 2});
    //             return;
    //         };

    //         // ver se o password é igual
    //         login.checkPassword(
    //             req.body["password"],
    //             user.password,
    //             general,
    //         },
    // ]);

    // ver se usuário existe
    login.checkIfUserExist({
        nickname: req.body["nickname"],
        db: req.mysql
    }, user => {

        // se o usuário não existe
        if (!user) {
            res.json({error: 2});
            return;
        };

        // usuário está banido
        if (user.ban) {
            res.json({error: 3});
            return;
        };

        // ver se o password é igual
        login.checkPassword(
            req.body["password"],
            user.password,
            general,
            function (equals) {

                // verificar se senha é igual e fazer login ou mandar erro
                if (equals) {
                    login.doLogin(
                        req,
                        res,
                        user,
                        general
                    );
                } else {
                    res.json({error: 2});
                };
            }
        );
    });
};

// rota -> /account/register
// de registro no site
exports.register = function (req, res) {

    console.log("TNC FDP!");

    // validando inputs
    req.checkBody("nickname", 0).len(4, 15);
    req.checkBody("password", 1).len(7, 30);
    req.checkBody("email", 2).isEmail();
    //req.checkBody("captcha", 3).len(4, 4);

    // checando se tem erros nas inputs
    if (req.validationErrors()) {
        res.json({error: 1});
        return;
    };

    // instancia das funçoes que serao utilizadas
    var general = new General(),
        register = new Register();

    // iniciar processo de registro
    async.parallel({
        // checar se o usuário existe
        userExist: next => {
            register.checkIfUserExist(
                // nickname
                req.body["nickname"],
                // database
                req.mysql,
                // callback
                next
            );
        },
        // checar se o e-mail está em uso
        emailInUse: next => {
            register.checkIfEmailInUse(
                // email
                req.body["email"],
                // database
                req.mysql,
                // callback
                next
            );
        },
        // checar se o captcha está certo
        validCaptcha: next => {
            register.checkCaptcha(
                // input
                req.body["captcha"],
                // captcha da sessão
                req.session["captcha"],
                // callback
                next
            );
        },
        // criptografar a senha
        cryptedPassword: next => {
            general.cryptPassword(
                // senha
                req.body["password"],
                // callback
                next
            );
        }
    }, (err, data) => register.complete(req, res, data));
};

// rota -> /account/logout
// de logout no site
exports.logout = function (req, res) {

    // se o token de autenticação for diferente do da input, retorna erro
    if (req.body["token"] !== req.session["csrfToken"]) {
        res.json({
            success: false
        });
        return;
    };

    // destrói sessão
    async.series([
        next => req.session.destroy(next),
        () => res.json({success: true})
    ]);
};

// rota -> /account/settings
// de configurações da conta
exports.settings = function (req, res) {

    // se não tiver conectado, renderiza o login
    if (!req.session["isConnected"]) {
        res.json({"login": true});
        return;
    };

    // checando token
    if (req.body["token"] !== req.session["csrfToken"]) {
        res.json({red: "alert"});
        return;
    };

    switch(+req.body["type"]) {
        // mudar e-mail
        case 1: {
            new Config().changeEmail(req, res);
            break;
        };
        // mudar senha
        case 2: {
            new Config().changePassword(req, res);
            break;
        };
        // mudar idioma
        case 3: {
            new Config().changeLanguage(req, res);
            break;
        };

        default: {
            res.json({not: "found"});
            break;
        };
    };
};

/* 
regex
nickname = /^[a-zA-Z 0-9\.\,\+\-\:\;\!\?\_]*$/;
^[a-zA-Z 0-9\.\,\+\-]*$
nome = /^[a-zA-Z\-]+$/;

*/