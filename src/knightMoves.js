import { newGame } from "./newGame";

let adjList = knightMovesAdjacencyList()

//shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.
function knightMoves(start, destination) {
  let u = destination;
  let path = [u];
  let bfsInfo = shortestPathBFS(adjList, start);
  while(bfsInfo[u].predecessor !== null) {
    path.push(bfsInfo[u].predecessor);
    u = bfsInfo[u].predecessor;
  }
  path.reverse();
  console.log(path);
  //format to coordinates
  let formattedPath = [];
  path.forEach(move => {
    let moveArray = [];
    let y = (move - (move % 8)) / 8
    let x = move - (y * 8);
    
    moveArray.push(x);
    moveArray.push(y);
    console.log(moveArray)
    formattedPath.push(moveArray)
  });
  
  return formattedPath;
}

//assume board is 8x8 board numbered 0-63 to find all possible edges (moves):

// 56 57 58 59 60 61 62 63
// 48 49 50 51 52 53 54 55
// 40 41 42 43 44 45 46 47
// 32 33 34 35 36 37 38 39
// 24 25 26 27 28 29 30 31
// 16 17 18 19 20 21 22 23
// 8  9  10 11 12 13 14 15
// 0  1  2  3  4  5  6  7

// e.g. from 36, the possible moves are to: 
// 21 (36 - 15) 
// 30 (36 - 6)
// etc...
function knightMovesAdjacencyList() {
  let adjacencyList = [];
  let knightMovement = [-15, -6, 10, 17, 15, 6, -10, -17];
  let knightMovementC1 = [-15, -6, 10, 17];
  let knightMovementC2 = [-15, -6, 10, 17, 15, -17];
  let knightMovementC3 = [-15, 17, 15, 6, -10, -17];
  let knightMovementC4 = [15, 6, -10, -17];

  //for each square (vertex i) on the chess board, list all non-negative moves (edges)
  for (let i = 0; i < 64; i++) {
    let tempArr = []

    //edge case 1: column 1 
    if (i % 8 === 0) {
      knightMovementC1.forEach(move => {
        if (i + move > 0 && i + move < 64) {tempArr.push(i + move)}
      });

    //edge case 2: column 2
    } else if ((i + 7) % 8 === 0){
      knightMovementC2.forEach(move => {
        if (i + move > 0 && i + move < 64) {tempArr.push(i + move)}
      });

    //edge case 3: column 7
    } else if ((i + 2) % 8 === 0){
      knightMovementC3.forEach(move => {
        if (i + move > 0 && i + move < 64) {tempArr.push(i + move)}
      });
      
    //edge case 4: column 8
    } else if ((i + 1) % 8 === 0){
      knightMovementC4.forEach(move => {
        if (i + move > 0 && i + move < 64) {tempArr.push(i + move)}
      });
      
    //default
    } else {
      knightMovement.forEach(move => {
        if (i + move > 0 && i + move < 64) {tempArr.push(i + move)}
      });
    }
    adjacencyList.push(tempArr)
  }
  return adjacencyList;
}

//performs a breadth-first search on the adjacency list 
function shortestPathBFS(adjList, start) {
  //search algorithm to find shortest path between knight location and destination
  let queue = [];
  let bfsInfo = [];

  for (let i = 0; i < adjList.length; i++) {
    bfsInfo[i] = {
      distance: null,
      predecessor: null
    };
  }

  bfsInfo[start].distance = 0;
  queue.push(start)

  //while queue is not empty
  while (queue.length !== 0) {
    //dequeue vertex u
    let u = queue.shift();

    //for each neighbor v of u that has not been visited
    for (let i = 0; i < adjList[u].length; i++) {
      let v = adjList[u][i];
      if (bfsInfo[v].distance === null) {
        bfsInfo[v].distance = bfsInfo[u].distance + 1; 
        bfsInfo[v].predecessor = u;

        //enqueue v
        queue.push(v);
      }
    }
  }
  return bfsInfo;
}

export {
  knightMoves
}