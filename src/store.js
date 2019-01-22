import { generateLevel, getVisitedEdges, tileTypes, calculateRegions, generateTileType, allSymbols } from './game';




let initialProgress = {
    tileTypes: [
        {
            tileType: "paired",
            groupSize: 2,
            symbol: "diamond",
            description: "Must be matched with one other of the same color"
        },
        {
            tileType: "sameColor",
            symbol: "drop",
            description: "Must not share a region with one of a different color"
        }
    ],
    currentDifficulty: 2,
    maxDifficulty: 2,
    winsToNextUnlock: 1
};

export const initialState = {
    // progress: initialProgress,
    level: {
        ...generateLevel(6, 6, initialProgress),
    },
    levelSelectShown: false,
    rulesShown: false
};

function persistProgress(progress) {
    localStorage.setItem("progress", JSON.stringify(progress));
}

export const reducer = (state = initialState, action) => {
    console.log(action.type);

    switch (action.type) {
    case 'RECEIVE_PROGRESS': {
        let progress = action.progress || initialProgress;
        return {
            ...state,
            progress,
            level: {
                ...generateLevel(6, 6, progress),
            }
        };
    }
    case 'UPDATE_TILE_DESCRIPTION': {
        console.log(action);
        let progress = {
            ...state.progress,
            tileTypes: [...state.progress.tileTypes]
        };

        progress.tileTypes[action.id] = {
            ...progress.tileTypes[action.id],
            description: action.description,
        };

        persistProgress(progress);

        return {
            ...state,
            progress
        };
    }
    case 'SHOW_LEVEL_SELECT': {
        return {
            ...state,
            levelSelectShown: true
        };
    }
    case 'HIDE_LEVEL_SELECT': {
        return {
            ...state,
            levelSelectShown: false
        };
    }
    case 'SHOW_RULES': {
        return {
            ...state,
            rulesShown: true
        };
    }
    case 'HIDE_RULES': {
        return {
            ...state,
            rulesShown: false
        };
    }
    case 'SET_CURRENT_DIFFICULTY': {
        if (action.val === state.progress.currentDifficulty) return {
            ...state,
            levelSelectShown: false,
        };
        let progress = {
            ...state.progress,
            currentDifficulty: action.val,
        };
        return {
            ...state,
            progress,
            level: {
                ...state.level,
                ...generateLevel(6, 6, progress),
            },
            levelSelectShown: false,
        };
    }
    case 'NEW_GAME':
        return {
            ...state,
            level: {
                ...state.level,
                ...generateLevel(6, 6, state.progress),
            }
        };
    case 'RESET_LEVEL':
        return {
            ...state,
            level: {
                ...state.level,
                edgeState: state.level.edges.map(e => ({
                    visited: false
                })),

                vertexState: state.level.vertices.map((e, i) => ({
                    visited: i === state.level.entries[0]
                })),

                tileState: state.level.tiles.map(e => ({
                    valid: true
                })),

                regions: [state.level.tiles.map((e, i) => (i))],

                path: [state.level.entries[0]],

                completed: false,

                won: false,
            }

        };
    case 'VISIT_VERTEX': {
        console.log(action.type);
        console.log(action.id);
        let vertexId = action.id;
        let vertexState = [...state.level.vertexState];
        vertexState[vertexId] = {...vertexState[vertexId]};
        let vertex = state.level.vertices[vertexId];
        let path = [...state.level.path];
        let completed = false;
        let won = false;

        if (!vertex) return state;
        // no need to keep going once completed
        if (state.level.completed) return state;

        let lastVertexId = path[path.length - 1];
        let backtrackVertexId = path[path.length - 2];

        let edgeId = state.level.edges.findIndex(e => {
            return e.vertices.indexOf(vertexId) >= 0
          && e.vertices.indexOf(lastVertexId) >= 0
          && !e.broken;
        });
        let edge = state.level.edges[edgeId];
        console.log("Found edge " + edgeId);
        console.log(edge);

        // if path is empty, must visit a start point
        if (path.length === 0 && vertex.vertexType !== "entry") {
            return state;
        }
        // if path has only entry point, visiting another entry starts a new path
        else if (path.length === 1 && vertex.vertexType === "entry") {
            path = [vertexId];
            vertexState = state.level.vertices.map(e => ({
                visited: false
            }));
            vertexState[vertexId].visited = true;
        }
        // restart level by visiting entry point when not on a neighbouring vertex
        else if (vertex.vertexType === "entry" && !edge) {
            path = [vertexId];
            vertexState = state.level.vertices.map(e => ({
                visited: false
            }));
            vertexState[vertexId].visited = true;
        }
        // backtrack
        else if (vertexId === backtrackVertexId) {
            vertexState[path.pop()] = {
                visited: false
            };
        }
        else if (vertexState[vertexId].visited) {
        // can't visit twice
            return state;
        }
        else if (path.length > 0 && !edge) {
        // no valid edge
            return state;
        }
        else {
        // visiting a new vertex
            vertexState[vertexId].visited = true;
            path.push(vertexId);
            if (vertex.vertexType === "exit") {
                // level completed - check if won
                completed = true;
            }

        }



        let visitedEdges = getVisitedEdges(path, state.level.edges);
        let edgeState = state.level.edgeState.map((e, i) => {
            if (visitedEdges.indexOf(i) >= 0) {
                return {
                    visited: true
                };
            }
            else {
                return {
                    visited: false
                };
            }
        });

        let regions = calculateRegions(state.level.tiles, state.level.edges, visitedEdges);
        //console.log("Current regions: ")
        //console.log(regions);
        // now validate the regions against the rules for each file
        won = true;

        let tileState = state.level.tiles.map((t, i) => {
            return {
                ...state.level.tileState[i],
                valid: true
            };
        });

        for (let i = 0; i < regions.length; i++) {
        // validate each region's tiles. if any is invalid, mutate tileState and set won to false;
            for (let t of regions[i]) {
                tileState[t].region = i;
                let tv = tileTypes[state.level.tiles[t].tileType].validate(t, regions[i], state.level.tiles, tileState);
                if (!tv) won = false;
                tileState[t].valid = tv;
            }
        }



        let newState = {
            ...state,
            level: {
                ...state.level,
                vertexState,
                edgeState,
                tileState,
                path,
                completed,
                won,
                regions
            }
        };

        if (won && completed && state.level.difficulty === state.progress.maxDifficulty) {
            let progress = newState.progress = {...state.progress};
            progress.winsToNextUnlock--;
            if (progress.winsToNextUnlock <= 0) {
                if (progress.tileTypes.length < allSymbols.length - 1) {
                    progress.winsToNextUnlock = 10;
                    progress.maxDifficulty++;
                    progress.currentDifficulty++;
                    progress.tileTypes = [...progress.tileTypes, generateTileType(progress)];
                    persistProgress(progress);
                }
            }
        }

        return newState;
    }
    default:
        return state;
    }
};

