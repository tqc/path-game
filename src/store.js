import { combineReducers } from 'redux'


let nextTodoId = 0
export const newGame = text => ({
  type: 'NEW_GAME',
  id: nextTodoId++,
  text
})

export const visitVertex = id => ({
  type: 'VISIT_VERTEX',
  id
})

const tileTypes = {
  blank: {
    validate: () => true
  },
  sameColor: {
    validate: (tileId, region, tiles, tileState) => {
      let tile = tiles[tileId];
      return !region.some(id => {
        if (id == tileId) return false;
        let otherTile = tiles[id];
        if (tile.tileType == otherTile.tileType && tile.color != otherTile.color) return true;
      });
    }
  }
}



function generateLevel(rows, cols) {
  let level = {
    name: "Generated Level",
    rows: rows,
    cols: cols,
    // 8x8
    tiles: [],
    // 8h, 9v
    edges: [],
    // 9x9
    vertices: []
  }

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let vertex = {
        x: j+1,
        y: i+1,
      };
      level.vertices.push(vertex);
    }
  }

  for (let row = 0; row <= rows; row++) {
    // add top edge
    for (let col = 0; col < cols; col++) {
      let topEdge = {
        x1: col+1,
        y1: row+1,
        x2: col+2,
        y2: row+1,
        tiles: [],
        vertices: [
        (row)*(cols+1) + col,
        (row)*(cols+1) + col + 1]
      };
      if (row > 0) {
        topEdge.tiles.push((row-1)*cols + col)
      }
      if (row < rows) {
        topEdge.tiles.push((row)*cols + col)
      }
      level.edges.push(topEdge);
    }

    // add left side if not below last row
    if (row < rows) {
      for (let col = 0; col <= cols; col++) {
        let leftEdge = {
          x1: col+1,
          y1: row+1,
          x2: col+1,
          y2: row+2,
          tiles: [],
          vertices: [
            (row)*(cols+1) + col,
            (row+1)*(cols+1) + col]
        };
        if (col > 0) {
          leftEdge.tiles.push((row)*cols + col-1)
        }
        if (col < cols) {
          leftEdge.tiles.push((row)*cols + col)
        }
        level.edges.push(leftEdge);
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let tile = {
        tileType: "blank",
        x1: j+1,
        y1: i+1,
        x2: j+2,
        y2: i+2
      };
      level.tiles.push(tile);
    }
  }

  // add an entry
  level.vertices[(rows+1)*(cols+1)-5].vertexType="entry";
  // add an exit
  level.vertices[4].vertexType="exit";

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

  level.path = [];

  level.completed = false;

  level.won = false;

// for testing

//  level.vertexState[(rows+1)*(cols+1)-5].visited=true;
//  level.path = [(rows+1)*(cols+1)-5];

  level.tiles[4].tileType="sameColor";
  level.tiles[4].color="black";

  level.tiles[5].tileType="sameColor";
  level.tiles[5].color="white";


  return level;
}

function expandRegion(startTile, region, unmatchedTiles, tiles, edges, edgeState) {
  unmatchedTiles.splice(unmatchedTiles.indexOf(startTile), 1);
  region.push(startTile);
  let neighbours = edges.filter((e, i) => {
    if (e.tiles.length < 2) return false;
    if (edgeState[i].visited) return false;
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
    expandRegion(t, region, unmatchedTiles, tiles, edges, edgeState);
  }
}

function calculateRegions(tiles, edges, edgeState) {
  let unmatchedTiles = tiles.map((e, i) => i);
  let regions = [];
  while (unmatchedTiles.length > 0) {
    let region = [];
    expandRegion(unmatchedTiles[0], region, unmatchedTiles, tiles, edges, edgeState)
    regions.push(region);
  }

  return regions;
}



export const initialState = {
    level: {
        ...generateLevel(8, 8),
        name: "TestLevel"
    }
};

const level = (state = initialState.level, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      console.log(action.type)
      return {
        ...state,
        ...generateLevel(8, 8)
      }
    case 'VISIT_VERTEX':
      console.log(action.type)
      console.log(action.id)
      let vertexId = action.id;
      let vertexState = [...state.vertexState];
      vertexState [vertexId] = {...vertexState[vertexId]};
      let vertex = state.vertices[vertexId];
      let path = [...state.path];
      let completed = state.completed;
      let won = state.won;

      if (!vertex) return state;

      let lastVertexId = path[path.length-1];
      let backtrackVertexId = path[path.length-2]

      let edgeId = state.edges.findIndex(e => {
        return e.vertices.indexOf(vertexId) >= 0 && e.vertices.indexOf(lastVertexId) >= 0
      })
      let edge = state.edges[edgeId];
      console.log("Found edge " + edgeId);
      console.log(edge);

      // if path is empty, must visit a start point
      if (path.length === 0 && vertex.vertexType != "entry") {
        return state;
      }
      // if path has only entry point, visiting another entry starts a new path
      else if (path.length == 1 && vertex.vertexType == "entry") {
        // todo: reset path/level state
        return state;
      }
      // backtrack
      else if (vertexId == lastVertexId || vertexId == backtrackVertexId) {
        vertexState[path.pop()] = {
          visited: false
        }
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
        if (vertex.vertexType == "exit") {
          // level completed - check if won
          completed = true;
        }

      }


      let edgeState = state.edgeState.map((e, i) => {
        let pi1 = path.indexOf(state.edges[i].vertices[0]);
        let pi2 = path.indexOf(state.edges[i].vertices[1]);
        if (pi1 >= 0 && pi2 >= 0 && Math.abs(pi2-pi1) == 1) {
          return {
            visited: true
          }
        }
        else {
          return {
            visited: false
          }
        }
      })

      let regions = calculateRegions(state.tiles, state.edges, edgeState);

      // now validate the regions against the rules for each file

      won = true;

      let tileState = state.tiles.map((t, i) => {
          return {
            ...state.tileState[i],
            valid: true
          }
      });



          for (let i = 0; i < regions.length; i++) {

            won = true;

            // validate each region's tiles. if any is invalid, mutate tileState and set won to false;
            for (let t of regions[i]) {
              tileState[t].region = i
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
   case 'ADD_TODO':
      return {
        ...state,
          id: action.id,
          text: action.text,
          completed: false
      }
    case 'TOGGLE_TODO':
      return state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
};

export const reducer = combineReducers({
  level
})

