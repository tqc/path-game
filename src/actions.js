
export const requestProgress = text => ({
    type: 'REQUEST_PROGRESS',
    text
});

export const receiveProgress = progress => ({
    type: 'RECEIVE_PROGRESS',
    progress
});

export function loadProgress() {
    return function(dispatch) {
        let progressString = localStorage.getItem('progress');
        let progress = progressString ? JSON.parse(progressString) : null;

        dispatch(receiveProgress(progress));
    }
}


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

export const showLevelSelect = id => ({
    type: 'SHOW_LEVEL_SELECT',
    id
});

export const hideLevelSelect = id => ({
    type: 'HIDE_LEVEL_SELECT',
    id
});

export const showRules = id => ({
    type: 'SHOW_RULES',
    id
});


export const hideRules = id => ({
    type: 'HIDE_RULES',
    id
});

export const setCurrentDifficulty = val => ({
    type: 'SET_CURRENT_DIFFICULTY',
    val
});