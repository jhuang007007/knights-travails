//Put together a script that creates a game board and a knight.
function newGame(i, j) {
  return {
    gameBoard: coordinateFactory(),
    knight: knightFactory(i, j)
  }
}

function coordinateFactory() {
  let coordinates = [];
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++)
    coordinates.push([i, j]);
  }
  return coordinates
}

function knightFactory(i, j) {
  if (i < 0 || j < 0 || i > 7 || j > 7) return null;
  
  return [i,j]
}

export { newGame };