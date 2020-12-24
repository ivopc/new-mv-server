class Formulas {
    static applyDamage (move, attacker, target, buffs) {
        // checking if is stab or not
        const stab = Resources.Formulas.Battle.Calc.stab({
            move_type: move.type,
            monster_type: Resources.Dex[attacker.monsterpedia_id].types
        });
        // checking type chart: if is weakness, strongest or immunity
        const typeChart = Resources.Formulas.Battle.Calc.typeChart({
            attacker: move.type,
            target: Resources.Dex[target.monsterpedia_id].types
        });
        // random choose if is criticial or not --> _.math.random.percentage(10)
        const critical = false;
        // get the damage according to stab, type chart and critical
        const damage = Resources.Formulas.Battle.Calc.damage.all({
            attacker: {
                level: attacker.level,
                atk: attacker.stats_attack,
                basePower: move.basePower
            },
            target: {
                def: target.stats_defense
            },
            mod: {
                stab,
                critical,
                typeChart,
                item: null
            },
            buffs: {
                attacker: buffs.attacker,
                target: buffs.target
            }
        });
        // edita o hp atual do monstro de acordo com o dano
        const hp = (target["current_HP"] - damage < 0) ? 0 : target["current_HP"] - damage;

        return {
            hp,
            damage
        };
    }

    static applyStatusProblem (move) {
        const stats = {};
        switch (move.statProblem) {
            // paralyzed
            case "par": {
                stats.stat = 1;
                break;
            };
            // poisoned
            case "psn": {
                stats.stat = 2;
                break;
            };
            // sleeping
            case "slp": {
                stats.stat = 5;
                break;
            };
        };
        return stats;
    }

    static applyAccuracy (move, buffDebuff = 0) {
        if (move.accuracy === true)
            return true;

        const rate = math.random.between([0, 100]);
        return rate <= move.accuracy * Resources.StatChange.accuracy[buffDebuff];
    }

    static tryTameMonster (monster, sealId, hp) {
        let dexData = Resources.Dex[monster.monsterpedia_id],
            seal = Resources.Items[sealId],
            rate = math.random.between([0, 100]);
        // if was master seal, always will be 100% of catch rate
        if (seal.effect.tame_rate == 0)
            return true;
        // * HP changes
        // HP percetage
        let percentage = (hp.current / hp.total) * 100;
        // set base multiply 1
        let hp_rate = 1;
        // if was 1% grow 2.1, if was 20% 1.7 and 50% 1.2
        if (percentage <= 1) {
            hp_rate = 2.1;
        } else if (percentage <= 20 && !(percentage >= 20)) {
            hp_rate = 1.7;
        } else if (percentage <= 50 && !(percentage >= 50)) {
            hp_rate = 1.2;
        };
        // * Status problem changes
        let status_problem_rate = 1;
        switch (monster.status_problem) {
            // paralyzed
            case 1: {
                status_problem_rate = 1.3;
                break;
            };
            // sleeping
            case 5: {
                status_problem_rate = 1.8;
                break;
            };
        };
        console.log(
            "---------------------------------",
            "\nsorteado:", rate, 
            "\nchance de cap. do monstro:", dexData.tame_rate, 
            "\nboost aumentado do selo:", seal.effect.tame_rate, 
            "\nboost aumentado de acordo com o HP:", hp_rate,
            "\nboost aumentado de acordo com status problem:", status_problem_rate,
            "\nchance de cap. com os modificadores (boosts):", dexData.tame_rate * seal.effect.tame_rate * hp_rate * status_problem_rate
        );
        // return the percetage of catch
        return rate <= dexData.tame_rate * seal.effect.tame_rate * hp_rate * status_problem_rate;
    }

    static treatBuffNerf (monstersId, buffDebuff) {}

};


module.exports = Formulas;