var _ = {
        math: {
            random: {}
        }
    },
    Monster = {},
    Stats = {},
    Battle = {},
    Exp = {},
    Utils = {
        exp: require("../database/game/experience.json"),
        typechart: require("../database/game/typechart.json"),
        dp: require("../database/game/droppoints.json"),
        nature: require("../database/game/nature.json"),
        statchange: require("../database/game/statchange.json")
    };

_.math.random.between = function (num) {
    return Math.floor(Math.random() * (num[1] - num[0] + 1) + num[0]);
};

_.math.random.betweenDecimal = function (num) {
    return Math.random() * (num[1] - num[0]) + num[0];
};

Monster.Generate = {};
// ver se monstro é shiny ou não
Monster.Generate.Shiny = function (num) {
    num = num || 900;
    return Math.floor(Math.random() * num) + 1 == 1;
};

Monster.Generate.Gender = function (num) {
    return 1;
};


Stats.Generate = {};
// gerar SP (Singular Points) randômicamente
Stats.Generate.SP = function () {
    
    const sp = {
        hp: "",
        atk: "",
        def: "",
        spe: ""
    };

    Object.keys(sp).forEach(stat => sp[stat] = _.math.random.between([1, 31]));

    return sp;
};

Stats.Calc = {};

Stats.Calc.stats = {}; 
// calcular novos status, baseado em dp, iv, level e etc
Stats.Calc.stats.all = function (object) {
    // base, level, dp, ip
    var stats = {};
    for (let i in object.sp) {
        stats[i] = this.fn.calcStat({
            baseStats: object.baseStats[i],
            sp: object.sp[i],
            dp: object.dp[i],
            level: object.level,
            stat: i
        });
    };

    return stats;
};

// incrementar dp do monstro que upou
Stats.Calc.stats.incDp = function (dp, id, isVip) {

    // dobrar DP ganho se for VIP
    let inc = isVip ? 2 : 1;

    // criar novo drop points
    let newDp = { ... dp };

    let _ = Utils.dp[id];

    for (let i in _)
        newDp[i] = newDp[i] + (_[i] * inc);

    return newDp;
};

Stats.Calc.stats.fn = {};
// função complementar pra calcular status
Stats.Calc.stats.fn.calcStat = function (object) {
    if (object["stat"] == "hp")
        return Math.round(((2 * object.baseStats + object.sp + object.dp / 4 + 100) * object.level) / 100 + 10);

    return Math.round((((2 * object.baseStats + object.sp + object.dp / 4) * object.level) / 100 + 5) * 1);
    //return Math.round((((2 * object.baseStats + object.ip + object.dp / 4) * object.level) / 100 + 5) * Utils.nature[object["nature"]][object["stat"]]);
};
// calculas da batalha
Battle.Calc = {};
Battle.Calc.damage = {};
// calcular damage
Battle.Calc.damage.all = function (object) {

    /*var buff = {
        "atk": Utils["statchange"]["stats"][object["buffs"][object["targets"][0]][object["attr"][0]]],
        "def": Utils["statchange"]["stats"][object["buffs"][object["targets"][1]][object["attr"][1]]]
    };

    var buff = {
        atk: Utils.statchange.stats[object.buffs.attacker[object.attr.attacker]],
        def: Utils.statchange.stats[object.buffs.target[object.attr.target]]
    };*/

    var buff = {
        atk: Utils.statchange.stats[object.buffs.attacker],
        def: Utils.statchange.stats[object.buffs.target]
    };

    var dmg = (((2 * object.attacker["level"] + 10) / 250) * ((object.attacker["atk"] * buff["atk"]) / (object.target["def"] * buff["def"])) * (object.attacker["basePower"] + 2)),
        mod =  object.mod["stab"] * object.mod["typeChart"] * (object.mod["critical"] ? 1.5 : 1) * _.math.random.betweenDecimal([0.70, 1]);//  * object.mod["item"];

    return Math.round(dmg * mod);
};
// calcular fraqueza, imunidade e vantagem
Battle.Calc.typeChart = function (object) {

    // 0, 0.25, 0.5, 1.0, 2.0, 4.0
    // object.attacker, object.target

    var attacker_type = Utils.typechart[object.attacker],
        target = object.target,
        num = 1;

    for (let i = 0, l = target.length; i < l; i++) {
        if (attacker_type["immunes"][target[i]])
            return 0;

        if (attacker_type["weaknesses"][target[i]])
            num /= 2;

        if (attacker_type["strengths"][target[i]])
            num *= 2;
    };

    return num;
};

// ver se attack é stab
Battle.Calc.stab = function (object) {
    for (let i = 0, type = object["monster_type"], l = type.length; i < l; i++)
        if (type[i] == object["move_type"])
            return 1.5;

    return 1;
};
// pegar stat change do move
Battle.Calc.statChange = function (object, stat) {
    for (let i in stat)
        object[i] += stat[i];
    return object;
};

Battle.Calc.damage.fn = {};

// calcular exp
Exp.Calc = {};
// calcular xp ganho em batalha
Exp.Calc.battleExpReward = function (object) {
    return Math.round((object.battle["trainerOrWild"] * 1 * object.opponent["expbase"] * object.battle["isHoldingLuckyEgg"] * object.opponent["level"] * 1 * 1 * 1) / 7 * object["number"]);
};
// converter level para xp
Exp.Calc.level2Exp = function (level) {
    return Utils.exp[level]["exp"];
};
//converter xp para level
Exp.Calc.exp2Level = function (exp) {
    if (exp >= 1059860)
        return 100;

    for (let i = 1, l = Utils.exp.length; i < l; i++) {
        let _ = i + 1;
        if (exp <= Utils.exp[_]["exp"] && Utils.exp[i]["exp"] <= exp)
            return (exp == Utils.exp[_]["exp"]) ? Utils.exp[_]["level"] : Utils.exp[i]["level"];
    };

    return 1;
};

Exp.Calc.fn = {};

module.exports = { Monster, Stats, Battle, Exp };