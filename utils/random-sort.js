const getRange = possibility => possibility.split("..").map(number => Number(number));

function getMaxPossibility (possibilities) {
    const possibilitiesKeys = Object.keys(possibilities);
    const lastRange = possibilitiesKeys[possibilitiesKeys.length - 1];
    return getRange(lastRange)[1];
};

function randomSort (possibilities) {
    const rate = Math.floor(Math.random() * getMaxPossibility(possibilities)) + 1;
    return possibilities[Object.keys(possibilities).find(possibility => {
        const [ min, max ] = getRange(possibility);
        return rate >= min && rate <= max;
    })];
};

module.exports = randomSort;