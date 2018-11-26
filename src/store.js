import { combineReducers } from 'redux';


const tileTypes = {
    blank: {
        validate: () => true
    },
    sameColor: {
        place: (regions, tiles) => {
            console.log("placing sameColor tiles");
            // at least two colors, up to the number of regions
            let availableColors = ["black", "white", "red", "blue", "green"];
            let colorCount = Math.min(availableColors.length, Math.floor(Math.random() * (regions.length - 2) + 2));

            console.log("placing sameColor tiles - " + colorCount);

            let unclaimedRegions = [...regions.keys()];
            for (let i = 0; i < colorCount; i++) {
                let ri = Math.floor(Math.random() * unclaimedRegions.length);
                let regionId = unclaimedRegions[ri];
                unclaimedRegions.splice(ri, 1);
                let region = regions[regionId];
                let maxInRegion = Math.ceil(region.length / 2);
                let minInRegion = 1;
                let countInRegion = Math.floor(Math.random() * (maxInRegion - minInRegion) + minInRegion);
                for (let j = 0; j < countInRegion; j++) {
                    let tile = tiles[region[Math.floor(Math.random() * region.length)]];
                    if (tile.tileType !== "blank") continue;
                    tile.tileType = "sameColor";
                    tile.color = availableColors[i];
                }

            }

        },
        validate: (tileId, region, tiles, tileState) => {
            let tile = tiles[tileId];
            let conflicts = region.filter(id => {
                if (id === tileId) return false;
                let otherTile = tiles[id];
                if (tile.tileType === otherTile.tileType && tile.color !== otherTile.color) {
                    return true;
                }
                return false;
            });
            if (conflicts.length > 0) {
                console.log("failed on tile " + tileId);
                console.log(tile);
                console.log(region);
                console.log(conflicts);
                console.log(tiles[conflicts[0]]);

            }
            return conflicts.length === 0;
        }
    }
};

function neighbouringVertices(vertexId, edges) {
    return edges.filter((e, i) => {
        if (e.vertices.length < 2) return false;
        if (e.vertices[0] === vertexId || e.vertices[1] === vertexId) return true;
        else return false;
    }).map((e, i) => {
        if (e.vertices[0] === vertexId) return e.vertices[1];
        else return e.vertices[0];
    });
}

function getVisitedEdges(path, edges) {
    let visitedEdges = [];
    for (let i = 0; i < edges.length; i++) {
        let pi1 = path.indexOf(edges[i].vertices[0]);
        let pi2 = path.indexOf(edges[i].vertices[1]);
        if (pi1 >= 0 && pi2 >= 0 && Math.abs(pi2 - pi1) === 1) {
            visitedEdges.push(i);
        }
    }
    return visitedEdges;
}


function expandRegion(startTile, region, unmatchedTiles, tiles, edges, visitedEdges) {
    unmatchedTiles.splice(unmatchedTiles.indexOf(startTile), 1);
    region.push(startTile);
    let neighbours = edges.filter((e, i) => {
        if (e.tiles.length < 2) return false;
        if (visitedEdges.indexOf(i) >= 0) return false;
        let otherTile;
        if (e.tiles[0] === startTile) otherTile = e.tiles[1];
        else if (e.tiles[1] === startTile) otherTile = e.tiles[0];
        else return false;
        if (unmatchedTiles.indexOf(otherTile) < 0) return false;
        return true;
    }).map((e, i) => {
        if (e.tiles[0] === startTile) return e.tiles[1];
        else return e.tiles[0];
    });
    for (let t of neighbours) {
    // tile may have matched since the filtering step
        if (unmatchedTiles.indexOf(t) < 0) continue;
        expandRegion(t, region, unmatchedTiles, tiles, edges, visitedEdges);
    }
}

function calculateRegions(tiles, edges, visitedEdges) {
    let unmatchedTiles = tiles.map((e, i) => i);
    let regions = [];
    while (unmatchedTiles.length > 0) {
        let region = [];
        expandRegion(unmatchedTiles[0], region, unmatchedTiles, tiles, edges, visitedEdges);
        regions.push(region);
    }

    return regions;
}


function randomPath(path, vertices, edges, tiles) {
    if (vertices[path[path.length - 1]].vertexType === "exit") {
    // this may be a valid solution
        let visitedEdges = getVisitedEdges(path, edges);

        let solution = {
            path: path,
            length: path.length,
            regions: calculateRegions(tiles, edges, visitedEdges)
        };
        if (solution.regions.length < 4) return null;
        return solution;
    }

    // otherwise, see if a random edge leads to a solution

    // all unvisited neighbours
    let nextPoints = vertices[path[path.length - 1]].neighbours.filter(v => path.indexOf(v) < 0);
    if (nextPoints.length === 0) {
    // dead end
        return null;
    }
    let shouldBacktrack = Math.random() > 0.5 && path.length > 1;
    let foundSolution;

    while (!shouldBacktrack && !foundSolution) {
        let nextVertexId = nextPoints[Math.floor(Math.random() * nextPoints.length)];
        let newPath = [...path, nextVertexId];
        foundSolution = randomPath(newPath, vertices, edges, tiles);
        if (foundSolution) return foundSolution;
        shouldBacktrack = Math.random() > 0.5 && path.length > 1;
    }
    return null;
}


function generateLevel(rows, cols) {
    let level = {
        name: "Generated Level",
        levelId: Math.floor(Math.random() * 10000000),
        rows: rows,
        cols: cols,
        // 8x8
        tiles: [],
        // 8h, 9v
        edges: [],
        // 9x9
        vertices: [],
        path: [],
        completed: false,
        won: false,
    };

    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
            let vertex = {
                x: j + 1,
                y: i + 1,
            };
            level.vertices.push(vertex);
        }
    }

    for (let row = 0; row <= rows; row++) {
    // add top edge
        for (let col = 0; col < cols; col++) {
            let topEdge = {
                x1: col + 1,
                y1: row + 1,
                x2: col + 2,
                y2: row + 1,
                broken: false,
                tiles: [],
                vertices: [
                    (row) * (cols + 1) + col,
                    (row) * (cols + 1) + col + 1]
            };
            if (row > 0) {
                topEdge.tiles.push((row - 1) * cols + col);
            }
            if (row < rows) {
                topEdge.tiles.push((row) * cols + col);
            }
            level.edges.push(topEdge);
        }

        // add left side if not below last row
        if (row < rows) {
            for (let col = 0; col <= cols; col++) {
                let leftEdge = {
                    x1: col + 1,
                    y1: row + 1,
                    x2: col + 1,
                    y2: row + 2,
                    broken: false,
                    tiles: [],
                    vertices: [
                        (row) * (cols + 1) + col,
                        (row + 1) * (cols + 1) + col]
                };
                if (col > 0) {
                    leftEdge.tiles.push((row) * cols + col - 1);
                }
                if (col < cols) {
                    leftEdge.tiles.push((row) * cols + col);
                }
                level.edges.push(leftEdge);
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let tile = {
                tileType: "blank",
                x1: j + 1,
                y1: i + 1,
                x2: j + 2,
                y2: i + 2
            };
            level.tiles.push(tile);
        }
    }


    for (let i = 0; i < level.vertices.length; i++) {
        level.vertices[i].neighbours = neighbouringVertices(i, level.edges);
    }


    // add an entry
    let entries = [(rows + 1) * (cols + 1) - 5];

    for (let i = 0; i < entries.length; i++) {
        level.vertices[entries[i]].vertexType = "entry";
    }


    // add an exit
    let exits = [4];

    for (let i = 0; i < exits.length; i++) {
        level.vertices[exits[i]].vertexType = "exit";
    }


    // let solutions = [];


    //  for (let i = 0; i < entries.length; i++) {
    //    extendPath([entries[i]], level.vertices, level.edges, solutions)
    //  }

    let solution = randomPath([entries[0]], level.vertices, level.edges, level.tiles);

    for (let i = 0; i < solution.regions.length; i++) {
        for (let j = 0; j < solution.regions[i].length; j++) {
            level.tiles[solution.regions[i][j]].solutionRegion = i;
        }
    }

    let minBreaks = 5;
    let maxBreaks = 20;
    let breaks = Math.floor(Math.random() * (maxBreaks - minBreaks) + minBreaks);
    // add random broken edges
    for (let i = 0; i < breaks; i++) {
        let edgeId = Math.floor(Math.random() * level.edges.length);
        if (solution.path.indexOf(edgeId) >= 0) continue;
        console.log("breaking edge " + edgeId);
        level.edges[edgeId].broken = true;
    }

    // add tiles

    for (let tileType of ["sameColor"]) {
        tileTypes[tileType].place(solution.regions, level.tiles);
    }

    level.edgeState = level.edges.map(e => ({
        visited: false
    }));

    level.vertexState = level.vertices.map(e => ({
        visited: false
    }));

    level.tileState = level.tiles.map(e => ({
        valid: true
    }));

    level.regions = [level.tiles.map((e, i) => (i))];

    // for testing

    level.vertexState[entries[0]].visited = true;
    level.path = [entries[0]];


    return level;
}


export const initialState = {
    level: {
        ...generateLevel(8, 8),
    }
};

const level = (state = initialState.level, action) => {
    console.log(action.type);

    switch (action.type) {
    case 'NEW_GAME':
        return {
            ...state,
            ...generateLevel(8, 8)
        };
    case 'RESET_LEVEL':
        return {
            ...state,
            edgeState: state.edges.map(e => ({
                visited: false
            })),

            vertexState: state.vertices.map(e => ({
                visited: false
            })),

            tileState: state.tiles.map(e => ({
                valid: true
            })),

            regions: [state.tiles.map((e, i) => (i))],

            path: [],

            completed: false,

            won: false,

        };
    case 'VISIT_VERTEX': {
        console.log(action.type);
        console.log(action.id);
        let vertexId = action.id;
        let vertexState = [...state.vertexState];
        vertexState[vertexId] = {...vertexState[vertexId]};
        let vertex = state.vertices[vertexId];
        let path = [...state.path];
        let completed = false;
        let won = false;

        if (!vertex) return state;
        // no need to keep going once completed
        if (state.completed) return state;

        let lastVertexId = path[path.length - 1];
        let backtrackVertexId = path[path.length - 2];

        let edgeId = state.edges.findIndex(e => {
            return e.vertices.indexOf(vertexId) >= 0
          && e.vertices.indexOf(lastVertexId) >= 0
          && !e.broken;
        });
        let edge = state.edges[edgeId];
        console.log("Found edge " + edgeId);
        console.log(edge);

        // if path is empty, must visit a start point
        if (path.length === 0 && vertex.vertexType !== "entry") {
            return state;
        }
        // if path has only entry point, visiting another entry starts a new path
        else if (path.length === 1 && vertex.vertexType === "entry") {
            path = [vertexId];
            vertexState = state.vertices.map(e => ({
                visited: false
            }));
            vertexState[vertexId].visited = true;
        }
        // backtrack
        else if (vertexId === lastVertexId || vertexId === backtrackVertexId) {
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



        let visitedEdges = getVisitedEdges(path, state.edges);
        let edgeState = state.edgeState.map((e, i) => {
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

        let regions = calculateRegions(state.tiles, state.edges, visitedEdges);
        //console.log("Current regions: ")
        //console.log(regions);
        // now validate the regions against the rules for each file
        won = true;

        let tileState = state.tiles.map((t, i) => {
            return {
                ...state.tileState[i],
                valid: true
            };
        });

        for (let i = 0; i < regions.length; i++) {
        // validate each region's tiles. if any is invalid, mutate tileState and set won to false;
            for (let t of regions[i]) {
                tileState[t].region = i;
                let tv = tileTypes[state.tiles[t].tileType].validate(t, regions[i], state.tiles, tileState);
                if (!tv) won = false;
                tileState[t].valid = tv;
            }
        }


        let newState = {
            ...state,
            vertexState,
            edgeState,
            tileState,
            path,
            completed,
            won,
            regions
        };
        return newState;
    }
    default:
        return state;
    }
};

export const reducer = combineReducers({
    level
});

