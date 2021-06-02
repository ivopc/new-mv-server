const Resources = {
    Dex: require("./../database/game/dex.json"),
    Formulas: require("./../formulas"),
    Learnset: require("./../database/game/learnset.json")
};

const { VITA_INCREASE } = require("./../../constants/Monster");

const { getMonster } = require("./../models/monster.db");

const { learnMoveByLevel } = require("./move-learn.service");

const addExpRewards = async () => {
    // verifica se upou de level subtraindo suposto novo level com level antes de upar para incrementar na db
    let lvl_inc = object.level.new > object.level.current ? object.level.new - object.level.current : 0,
    // incrementa dp atual com dp do oponente que venceu
        dp = Resources.Formulas.Stats.Calc.stats.incDp(object.stats["dp"], object.opponent, object.isVip),
        specie = object.specie.current,
    // pega todos os golpes que aprendeu upando de level
        learn = learnMoveByLevel({
            new: object.level.new,
            current: object.level.current,
            specie
        });

    // ** Normalizar Drop Points

    // guarda stats que já chegaram ao limite
    const statusReached = [];
    Object.keys(dp).forEach(stat => {
        if (dp[stat] > 252) {
            dp[stat] = 252;
            // add status q chegou ao limite
            statusReached.push(stat);
        };
    });

    // se já chegou a limite, seta oq estava antes
    if ( (dp.hp + dp.atk + dp.def + dp.spe) >= 510) {

        dp = object.stats["dp"];

        // seta status q já chegaram ao limite
        statusReached.forEach(stat => {
            dp[stat] = 252;
        });
    };

    // dp.hp
    // dp.atk
    // dp.def
    // dp.spe

    if (object.evolved)
        specie = Resources.Dex[Resources.Dex[specie.monsterpedia_id].evos.default];

    console.log("Level atual: " + (object["level"]["current"]) + "\nQuantos lvl upou? " + (lvl_inc));
    console.log("Evoluiu? " + (object["evolved"] ? "Sim" : "Não"));
    console.log("monstro atual", specie);
    console.log("aprendeu", learn);
    console.log("drop points", dp);

    // calcula novos status de acordo com dp que adquiriu na batalha
    const stats = Resources.Formulas.Stats.Calc.stats.all({
        sp: {
            hp: object.stats.sp["hp"],
            atk: object.stats.sp["atk"],
            def: object.stats.sp["def"],
            spe: object.stats.sp["spe"]
        },
        dp: {
            hp: dp.hp + (object.stats.vita["hp"] * VITA_INCREASE),
            atk: dp.atk + (object.stats.vita["atk"] * VITA_INCREASE),
            def: dp.def + (object.stats.vita["def"] * VITA_INCREASE),
            spe: dp.spe + (object.stats.vita["spe"] * VITA_INCREASE)
        },
        level: object.level.new,
        baseStats: Resources.Dex[specie.monsterpedia_id]["baseStats"]
    });

    console.log("dp atk", dp.atk + (object.stats.vita["atk"] * 10), object.stats.vita["atk"] * 10, stats.atk);

    //console.log("stats", stats);
    // caso upou
    if (lvl_inc > 0) {
        console.log("--------------------------------------__");
        console.log("HELLOUUUU UPOU SIM");

        const notify = new Notify(this.socket, this.auth, this.db);

        async.parallel({
            learnMove: next => {
                console.log({learn});
                if (learn.length > 0) {
                    console.log("VAI APRENDER ALGO");
                    notify.insertLearnMove({id: object.id, moves: object.moves}, learn, next);
                } else {
                    console.log("Não vai aprender nada");
                    next(null, false);
                };
            },
            evolved: next => {
                if (object.evolved) {
                    notify.insertEvolveMonster({id: object.id}, specie.monsterpedia_id, next);
                } else {
                    next(null, false);
                };
            },
            updateMonster: next => {
                this.mysqlQuery(
                    "UPDATE `monsters` SET `monsterpedia_id` = '" + specie.monsterpedia_id + "', `level` = '" + object.level.new + "', `experience` = '" + object.exp + "', `stats_HP` = '" + stats.hp + "', `stats_attack` = '" + stats.atk + "', `stats_defense` = '" + stats.def + "', `stats_speed` = '" + stats.spe + "', `dp_HP` = '" + dp.hp + "', `dp_attack` = '" + dp.atk + "', `dp_defense` = '" + dp.def + "', `dp_speed` = '" + dp.spe + "' WHERE `id` = '" + object.id + "'",
                    next
                );
            }
        }, callback);

    } else {
        console.log("UPOU NADA POHA!!");
        this.mysqlQuery(
            "UPDATE `monsters` SET `experience` = '" + object.exp + "', `dp_HP` = '" + dp.hp + "', `dp_attack` = '" + dp.atk + "', `dp_defense` = '" + dp.def + "', `dp_speed` = '" + dp.spe + "' WHERE `id` = '" + object.id + "'",
            callback
        );
    };
};

const evolve = async (monsterId, userId, evolveTo) => {
    const monsterData = await getMonster(monsterId);
    if (!monsterData.user_id != userId)
        return;
    // recalc stat
    const stats = Resources.Formulas.Stats.Calc.stats.all({
        sp: {
            hp: monsterData.sp_HP,
            atk: monsterData.sp_attack,
            def: monsterData.sp_defense,
            spe: monsterData.sp_speed
        },
        dp: {
            hp: monsterData.dp_HP + (monsterData.vita_HP * VITA_INCREASE),
            atk: monsterData.dp_attack + (monsterData.vita_attack * VITA_INCREASE),
            def: monsterData.dp_defense + (monsterData.vita_defense * VITA_INCREASE),
            spe: monsterData.dp_speed + (monsterData.vita_speed * VITA_INCREASE)
        },
        level: monsterData.level,
        baseStats: Resources.Dex[evolveTo]["baseStats"]
    });
    // evoluir monstro e mudar stats
    this.mysqlQuery(
        "UPDATE `monsters` SET `monsterpedia_id` = '" + evolveTo + "', `stats_HP` = '" + stats.hp + "', `stats_attack` = '" + stats.atk + "', `stats_defense` = '" + stats.def + "', `stats_speed` = '" + stats.spe + "' WHERE `id` = '" + monster_id + "'",
        next
    );

};

module.exports = { addExpRewards, evolve };