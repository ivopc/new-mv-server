module.exports = {
    1: {
        "id": 1,
        "name": {
            "br": "Bola de Fogo",
            "en": "Fireball"
        },
        "desc": {
            "br": "Mordida fraca.",
            "en": "Weak bite."
        },
        "accuracy": 100,
        "basePower": 40,
        "type": "null",
        "category": "Normal",
        "priority": 0,
        "target": 0,
        "flags": {
            "protect": true
        },
        "manaNeeded": 0,
        "boosts": {},
        "recoil": {
            "hp": -20
        },
        on: {
            start: function (target) {},
            hit: function (target) {},
            end: function (target) {},
            try: function (target) {}
        }
    },
    2: {
        id: 2,
        "name": {
            "br": "Rosnar",
            "en": "Growl"
        },
        "desc": {
            "br": "Rosnar.",
            "en": "Growl."
        },
        "accuracy": 100,
        "basePower": 0,
        "type": "null",
        "category": "Status",
        "priority": 0,
        "target": "opponent",
        "flags": {
            "protect": true
        },
        "boosts": [
            {"stat": "def", "value": +2},
            {"stat": "atk", "value": +1}
        ],
        on: {
            start: function (target) {},
            hit: function (target) {},
            end: function (target) {},
            try: function (target) {}
        }
    },
    3: {
        id: 3,
        "name": {
            "br": "Paralizar",
            "en": "Paralyze"
        },
        "desc": {
            "br": "Paralizar oponente.",
            "en": "Paralyze opponent."
        },
        "accuracy": 100,
        "basePower": 0,
        "type": "electric",
        "category": "StatusProblem",
        "statProblem": "par",
        "priority": 0,
        "target": 0,
        "flags": {
            "protect": true
        },
        on: {
            start: function (target) {},
            hit: function (target) {},
            end: function (target) {},
            try: function (target) {}
        }
    },
    4: {
        id: 4,
        "name": {
            "br": "Envenenar",
            "en": "Poison"
        },
        "desc": {
            "br": "Evenenar oponente.",
            "en": "Poison opponent."
        },
        "accuracy": 60,
        "basePower": 0,
        "type": "null",
        "category": "StatusProblem",
        "statProblem": "psn",
        "priority": 0,
        "target": 0,
        "flags": {
            "protect": true
        },
        on: {
            start: function (target) {},
            hit: function (target) {},
            end: function (target) {},
            try: function (target) {}
        }
    },
    5: {
        id: 5,
        "name": {
            "br": "Hipnose",
            "en": "Hypnosis"
        },
        "desc": {
            "br": "Hipnotizar oponente.",
            "en": "Hypnotize opponent."
        },
        "accuracy": 60,
        "basePower": 0,
        "type": "null",
        "category": "StatusProblem",
        "statProblem": "slp",
        "priority": 0,
        "target": 0,
        "flags": {
            "protect": true
        },
        on: {
            start: function (target) {},
            hit: function (target) {},
            end: function (target) {},
            try: function (target) {}
        }
    },
};

/*
    name: nome do movimento

    desc: descrição do movimento

    accuracy:
        0~100: porcentagem
        true: 100% de chance, independente da visão

    basePower: poder base do movimento

    category:
        Normal: [Ataque] Base de Ataque e Defesa.
        Status: Boosts/Nerfs. Aumenta/Diminui algum atributo dos stats.
        StatusProblem: Status Problema. Envenena, congela, queima, confuso e etc.
            1 = paralizado 'par' [x]
            2 = envenenado 'psn' [x]
            3 = congelado 'frz'
            4 = queimado 'brn'
            5 = dormindo 'slp' [x]
            6 = confuso 'cfs'
        Weather: Condição climática. Muda a condição climática: chuva, neve e etc.
        Trap: Armadilhas. Atrapalha alvo em algo especifico.
        Bless: Benção. (preturn) alvo ganha algum tipo de boost todo turno.

    priority: númeração de prioridade do ataque (de -5 a 10)

    target:
        opponent
        self

    flags:
        protect: Alvo pode se proteger?

    eventos:
        on:
            start:
            hit:
            end:
            try:
*/
