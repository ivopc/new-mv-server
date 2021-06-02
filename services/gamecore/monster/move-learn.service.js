const { isMonsterFromPlayer, setMove } =  require("../../models/monster.db");

// used when we create a new monster or wild monster
const getAllMoves = (monsterId, monsterpediaId, level) => {
    // get the monster learnset and create an array to register moves to learn
    const 
        moves = Resources.Learnset[monsterpediaId].level,
        learnMoves = [];
    for (let i = 0; i < moves.length; i++) {
        // is the learned of move is before or in the exactly level,
        // add to array of moves
        if (moves[i][0] <= level) {
            // (4 -> max of moves that monster can have)
            if (learnMoves.length === 4) {
                learnMoves[3] = moves[i][1];
            } else {
                learnMoves.push(moves[i][1]);
            };
        };
    };
    return learnMoves;
};

// when monster level up this is called
const learnMoveByLevel = (monsterpediaId, oldLevel, newLevel) => {
    // oldLevel = current level (befor get the exp)
    const 
        moves = Resources.Learnset[monsterpediaId].level,
        learnMoves = [];

    // faz um loop do level antes de vencer o oponente até o level que upou
    // para pegar todos os ataques possíveis
    for(let i = newLevel; i > oldLevel; --i) {
        for (let j = 0; j < moves.length; j ++) {
                // se o level que percorreu enquanto upou tiver 
                // algum move de aprender adiciona na array esse move
                if (moves[j][0] === i)
                        learnMoves.push(moves[j][1]);
        }; 
    };
    return learnMoves.reverse();
};

const learnMove = async (userId, monsterId, moveId, moveSlotPosition) => {
    const isFrom = await isMonsterFromPlayer(monsterId, userId);
    if (!isFrom)
        return;
    await setMove(monsterId, moveId, moveSlotPosition);
};

module.exports = { getAllMoves, learnMoveByLevel, learnMove };