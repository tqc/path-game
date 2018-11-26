export const newGame = text => ({
    type: 'NEW_GAME',
    text
});

export const visitVertex = id => ({
    type: 'VISIT_VERTEX',
    id
});

export const resetLevel = id => ({
    type: 'RESET_LEVEL',
    id
});