export const tileTypes = {
    blank: {
        validate: () => true
    },
    paired: {
        generateSubtype: (symbol) => {
            return {
                tileType: "paired",
                groupSize: Math.floor(Math.random() * 5 + 1),
                symbol
            };
        },
        place: (tileSpec, regions, tiles) => {
            console.log("placing paired tiles");
            // at least two colors, up to the number of regions
            let availableColors = ["black", "white", "orange", "blue", "green", "purple", "yellow"]
                .map((a) => [Math.random(), a])
                .sort((a, b) => a[0] - b[0])
                .map((a) => a[1]);
            let colorCount = Math.min(availableColors.length, Math.floor(Math.random() * (regions.length - 2) + 2));

            for (let i = 0; i < colorCount; i++) {
                let color = availableColors[i];
                let availableRegions = [...regions.keys()].filter(regionId => {
                    let region = regions[regionId];
                    // reject regions which already contain a pair
                    if (region.some(id => {
                        return tiles[id].tileType === "paired" && tiles[id].color === color;
                    })) return false;
                    // need at least groupSize free tiles
                    if (region.filter(id => {
                        return tiles[id].tileType === "blank";
                    }).length < tileSpec.groupSize) return false;
                    return true;
                });

                let regionCount = Math.min(availableRegions.length, Math.floor(Math.random() * (regions.length - 2) + 2));

                for (let j = 0; j < regionCount; j++) {
                    if (availableRegions.length === 0) continue;

                    let ri = Math.floor(Math.random() * availableRegions.length);
                    let regionId = availableRegions[ri];
                    availableRegions.splice(ri, 1);
                    let region = regions[regionId];
                    for (let k = 0; k < tileSpec.groupSize; k++) {
                        let availableTiles = region.filter(id => {
                            return tiles[id].tileType === "blank";
                        });
                        let tile = tiles[availableTiles[Math.floor(Math.random() * availableTiles.length)]];
                        tile.tileType = "paired";
                        tile.color = color;
                        tile.groupSize = tileSpec.groupSize;
                        tile.symbol = tileSpec.symbol;
                    }
                }
            }
        },
        validate: (tileId, region, tiles, tileState) => {
            let tile = tiles[tileId];
            let matchesInRegion = region.filter(id => {
                let otherTile = tiles[id];
                if (tile.tileType === otherTile.tileType && tile.color === otherTile.color) {
                    return true;
                }
                return false;
            });
            return matchesInRegion.length === tile.groupSize;
        }
    },
    sameColor: {
        place: (tileSpec, regions, tiles) => {
            console.log("placing sameColor tiles");
            // at least two colors, up to the number of regions
            let availableColors = ["black", "white", "orange", "blue", "green", "purple", "yellow"]
                .map((a) => [Math.random(), a])
                .sort((a, b) => a[0] - b[0])
                .map((a) => a[1]);
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
                    tile.symbol = tileSpec.symbol
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

export const allSymbols = ["tree", "drop", "square", "circle", "diamond", "octagon", "blob", "sun", "react"];


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

export function getVisitedEdges(path, edges) {
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

export function calculateRegions(tiles, edges, visitedEdges) {
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
            regions: calculateRegions(tiles, edges, visitedEdges),
            edges: visitedEdges

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


export function generateLevel(rows, cols, progress) {
    console.log(progress);
    let level = {
        name: "Generated Level",
        levelId: Math.floor(Math.random() * 10000000),
        difficulty: progress.currentDifficulty,
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
                vertexType: "standard"
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
    let entries = [Math.floor((rows + 1) * (cols + 1) - cols / 2 - 1)];

    for (let i = 0; i < entries.length; i++) {
        level.vertices[entries[i]].vertexType = "entry";
    }


    // add an exit
    let exits = [Math.floor(cols / 2)];

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
        if (solution.edges.indexOf(edgeId) >= 0) continue;
        console.log("breaking edge " + edgeId);
        level.edges[edgeId].broken = true;
    }

    // add tiles

    for (let i = 0; i < progress.tileTypes.length && i < level.difficulty; i++) {
        let tileSpec = progress.tileTypes[i];
        tileTypes[tileSpec.tileType].place(tileSpec, solution.regions, level.tiles, tileSpec);
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
    level.solution = solution;
    level.entries = entries;
    level.exits = exits;

    return level;
}

export function generateTileType(progress) {
    let usedSymbols = progress.tileTypes.map(t=>t.symbol);
    let availableSymbols = allSymbols.filter(s=>usedSymbols.indexOf(s) < 0);
    let symbol = availableSymbols[Math.floor(Math.random() * availableSymbols.length)];

    let availableTypes = Object.keys(tileTypes).filter(t => !!tileTypes[t].generateSubtype);

    let type = tileTypes[availableTypes[Math.floor(Math.random() * availableTypes.length)]];
    return type.generateSubtype(symbol);
}

