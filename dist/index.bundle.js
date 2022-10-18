/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/knightMoves.js":
/*!****************************!*\
  !*** ./src/knightMoves.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "knightMoves": () => (/* binding */ knightMoves)
/* harmony export */ });
/* harmony import */ var _newGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newGame */ "./src/newGame.js");


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

console.log(knightMoves(0, 63))

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



// 0  1  2  3  4  5  6  7
// 8  9  10 11 12 13 14 15
// 16 17 18 19 20 21 22 23
// 24 25 26 27 28 29 30 31
// 32 33 34 35 36 37 38 39
// 40 41 42 43 44 45 46 47
// 48 49 50 51 52 53 54 55
// 56 57 58 59 60 61 62 63

/***/ }),

/***/ "./src/newGame.js":
/*!************************!*\
  !*** ./src/newGame.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGame": () => (/* binding */ newGame)
/* harmony export */ });
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _knightMoves__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knightMoves */ "./src/knightMoves.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFvQzs7QUFFcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QyxPQUFPOztBQUVQO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsNENBQTRDO0FBQzVDLE9BQU87O0FBRVA7QUFDQSxNQUFNO0FBQ047QUFDQSw0Q0FBNEM7QUFDNUMsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSw0Q0FBNEM7QUFDNUMsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSw0Q0FBNEM7QUFDNUMsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDckJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2tuaWdodE1vdmVzLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvbmV3R2FtZS5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4vbmV3R2FtZVwiO1xuXG5sZXQgYWRqTGlzdCA9IGtuaWdodE1vdmVzQWRqYWNlbmN5TGlzdCgpXG5cbi8vc2hvd3MgdGhlIHNob3J0ZXN0IHBvc3NpYmxlIHdheSB0byBnZXQgZnJvbSBvbmUgc3F1YXJlIHRvIGFub3RoZXIgYnkgb3V0cHV0dGluZyBhbGwgc3F1YXJlcyB0aGUga25pZ2h0IHdpbGwgc3RvcCBvbiBhbG9uZyB0aGUgd2F5LlxuZnVuY3Rpb24ga25pZ2h0TW92ZXMoc3RhcnQsIGRlc3RpbmF0aW9uKSB7XG4gIGxldCB1ID0gZGVzdGluYXRpb247XG4gIGxldCBwYXRoID0gW3VdO1xuICBsZXQgYmZzSW5mbyA9IHNob3J0ZXN0UGF0aEJGUyhhZGpMaXN0LCBzdGFydCk7XG4gIHdoaWxlKGJmc0luZm9bdV0ucHJlZGVjZXNzb3IgIT09IG51bGwpIHtcbiAgICBwYXRoLnB1c2goYmZzSW5mb1t1XS5wcmVkZWNlc3Nvcik7XG4gICAgdSA9IGJmc0luZm9bdV0ucHJlZGVjZXNzb3I7XG4gIH1cbiAgcGF0aC5yZXZlcnNlKCk7XG4gIGNvbnNvbGUubG9nKHBhdGgpO1xuICAvL2Zvcm1hdCB0byBjb29yZGluYXRlc1xuICBsZXQgZm9ybWF0dGVkUGF0aCA9IFtdO1xuICBwYXRoLmZvckVhY2gobW92ZSA9PiB7XG4gICAgbGV0IG1vdmVBcnJheSA9IFtdO1xuICAgIGxldCB5ID0gKG1vdmUgLSAobW92ZSAlIDgpKSAvIDhcbiAgICBsZXQgeCA9IG1vdmUgLSAoeSAqIDgpO1xuICAgIFxuICAgIG1vdmVBcnJheS5wdXNoKHgpO1xuICAgIG1vdmVBcnJheS5wdXNoKHkpO1xuICAgIGNvbnNvbGUubG9nKG1vdmVBcnJheSlcbiAgICBmb3JtYXR0ZWRQYXRoLnB1c2gobW92ZUFycmF5KVxuICB9KTtcbiAgXG4gIHJldHVybiBmb3JtYXR0ZWRQYXRoO1xufVxuXG5jb25zb2xlLmxvZyhrbmlnaHRNb3ZlcygwLCA2MykpXG5cbi8vYXNzdW1lIGJvYXJkIGlzIDh4OCBib2FyZCBudW1iZXJlZCAwLTYzIHRvIGZpbmQgYWxsIHBvc3NpYmxlIGVkZ2VzIChtb3Zlcyk6XG5cbi8vIDU2IDU3IDU4IDU5IDYwIDYxIDYyIDYzXG4vLyA0OCA0OSA1MCA1MSA1MiA1MyA1NCA1NVxuLy8gNDAgNDEgNDIgNDMgNDQgNDUgNDYgNDdcbi8vIDMyIDMzIDM0IDM1IDM2IDM3IDM4IDM5XG4vLyAyNCAyNSAyNiAyNyAyOCAyOSAzMCAzMVxuLy8gMTYgMTcgMTggMTkgMjAgMjEgMjIgMjNcbi8vIDggIDkgIDEwIDExIDEyIDEzIDE0IDE1XG4vLyAwICAxICAyICAzICA0ICA1ICA2ICA3XG5cbi8vIGUuZy4gZnJvbSAzNiwgdGhlIHBvc3NpYmxlIG1vdmVzIGFyZSB0bzogXG4vLyAyMSAoMzYgLSAxNSkgXG4vLyAzMCAoMzYgLSA2KVxuLy8gZXRjLi4uXG5mdW5jdGlvbiBrbmlnaHRNb3Zlc0FkamFjZW5jeUxpc3QoKSB7XG4gIGxldCBhZGphY2VuY3lMaXN0ID0gW107XG4gIGxldCBrbmlnaHRNb3ZlbWVudCA9IFstMTUsIC02LCAxMCwgMTcsIDE1LCA2LCAtMTAsIC0xN107XG4gIGxldCBrbmlnaHRNb3ZlbWVudEMxID0gWy0xNSwgLTYsIDEwLCAxN107XG4gIGxldCBrbmlnaHRNb3ZlbWVudEMyID0gWy0xNSwgLTYsIDEwLCAxNywgMTUsIC0xN107XG4gIGxldCBrbmlnaHRNb3ZlbWVudEMzID0gWy0xNSwgMTcsIDE1LCA2LCAtMTAsIC0xN107XG4gIGxldCBrbmlnaHRNb3ZlbWVudEM0ID0gWzE1LCA2LCAtMTAsIC0xN107XG5cbiAgLy9mb3IgZWFjaCBzcXVhcmUgKHZlcnRleCBpKSBvbiB0aGUgY2hlc3MgYm9hcmQsIGxpc3QgYWxsIG5vbi1uZWdhdGl2ZSBtb3ZlcyAoZWRnZXMpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgIGxldCB0ZW1wQXJyID0gW11cblxuICAgIC8vZWRnZSBjYXNlIDE6IGNvbHVtbiAxIFxuICAgIGlmIChpICUgOCA9PT0gMCkge1xuICAgICAga25pZ2h0TW92ZW1lbnRDMS5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICBpZiAoaSArIG1vdmUgPiAwICYmIGkgKyBtb3ZlIDwgNjQpIHt0ZW1wQXJyLnB1c2goaSArIG1vdmUpfVxuICAgICAgfSk7XG5cbiAgICAvL2VkZ2UgY2FzZSAyOiBjb2x1bW4gMlxuICAgIH0gZWxzZSBpZiAoKGkgKyA3KSAlIDggPT09IDApe1xuICAgICAga25pZ2h0TW92ZW1lbnRDMi5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICBpZiAoaSArIG1vdmUgPiAwICYmIGkgKyBtb3ZlIDwgNjQpIHt0ZW1wQXJyLnB1c2goaSArIG1vdmUpfVxuICAgICAgfSk7XG5cbiAgICAvL2VkZ2UgY2FzZSAzOiBjb2x1bW4gN1xuICAgIH0gZWxzZSBpZiAoKGkgKyAyKSAlIDggPT09IDApe1xuICAgICAga25pZ2h0TW92ZW1lbnRDMy5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICBpZiAoaSArIG1vdmUgPiAwICYmIGkgKyBtb3ZlIDwgNjQpIHt0ZW1wQXJyLnB1c2goaSArIG1vdmUpfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAvL2VkZ2UgY2FzZSA0OiBjb2x1bW4gOFxuICAgIH0gZWxzZSBpZiAoKGkgKyAxKSAlIDggPT09IDApe1xuICAgICAga25pZ2h0TW92ZW1lbnRDNC5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICBpZiAoaSArIG1vdmUgPiAwICYmIGkgKyBtb3ZlIDwgNjQpIHt0ZW1wQXJyLnB1c2goaSArIG1vdmUpfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAvL2RlZmF1bHRcbiAgICB9IGVsc2Uge1xuICAgICAga25pZ2h0TW92ZW1lbnQuZm9yRWFjaChtb3ZlID0+IHtcbiAgICAgICAgaWYgKGkgKyBtb3ZlID4gMCAmJiBpICsgbW92ZSA8IDY0KSB7dGVtcEFyci5wdXNoKGkgKyBtb3ZlKX1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBhZGphY2VuY3lMaXN0LnB1c2godGVtcEFycilcbiAgfVxuICByZXR1cm4gYWRqYWNlbmN5TGlzdDtcbn1cblxuLy9wZXJmb3JtcyBhIGJyZWFkdGgtZmlyc3Qgc2VhcmNoIG9uIHRoZSBhZGphY2VuY3kgbGlzdCBcbmZ1bmN0aW9uIHNob3J0ZXN0UGF0aEJGUyhhZGpMaXN0LCBzdGFydCkge1xuICAvL3NlYXJjaCBhbGdvcml0aG0gdG8gZmluZCBzaG9ydGVzdCBwYXRoIGJldHdlZW4ga25pZ2h0IGxvY2F0aW9uIGFuZCBkZXN0aW5hdGlvblxuICBsZXQgcXVldWUgPSBbXTtcbiAgbGV0IGJmc0luZm8gPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFkakxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBiZnNJbmZvW2ldID0ge1xuICAgICAgZGlzdGFuY2U6IG51bGwsXG4gICAgICBwcmVkZWNlc3NvcjogbnVsbFxuICAgIH07XG4gIH1cblxuICBiZnNJbmZvW3N0YXJ0XS5kaXN0YW5jZSA9IDA7XG4gIHF1ZXVlLnB1c2goc3RhcnQpXG5cbiAgLy93aGlsZSBxdWV1ZSBpcyBub3QgZW1wdHlcbiAgd2hpbGUgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vZGVxdWV1ZSB2ZXJ0ZXggdVxuICAgIGxldCB1ID0gcXVldWUuc2hpZnQoKTtcblxuICAgIC8vZm9yIGVhY2ggbmVpZ2hib3IgdiBvZiB1IHRoYXQgaGFzIG5vdCBiZWVuIHZpc2l0ZWRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkakxpc3RbdV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB2ID0gYWRqTGlzdFt1XVtpXTtcbiAgICAgIGlmIChiZnNJbmZvW3ZdLmRpc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgIGJmc0luZm9bdl0uZGlzdGFuY2UgPSBiZnNJbmZvW3VdLmRpc3RhbmNlICsgMTsgXG4gICAgICAgIGJmc0luZm9bdl0ucHJlZGVjZXNzb3IgPSB1O1xuXG4gICAgICAgIC8vZW5xdWV1ZSB2XG4gICAgICAgIHF1ZXVlLnB1c2godik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBiZnNJbmZvO1xufVxuXG5leHBvcnQge1xuICBrbmlnaHRNb3Zlc1xufVxuXG4vLyAwICAxICAyICAzICA0ICA1ICA2ICA3XG4vLyA4ICA5ICAxMCAxMSAxMiAxMyAxNCAxNVxuLy8gMTYgMTcgMTggMTkgMjAgMjEgMjIgMjNcbi8vIDI0IDI1IDI2IDI3IDI4IDI5IDMwIDMxXG4vLyAzMiAzMyAzNCAzNSAzNiAzNyAzOCAzOVxuLy8gNDAgNDEgNDIgNDMgNDQgNDUgNDYgNDdcbi8vIDQ4IDQ5IDUwIDUxIDUyIDUzIDU0IDU1XG4vLyA1NiA1NyA1OCA1OSA2MCA2MSA2MiA2MyIsIi8vUHV0IHRvZ2V0aGVyIGEgc2NyaXB0IHRoYXQgY3JlYXRlcyBhIGdhbWUgYm9hcmQgYW5kIGEga25pZ2h0LlxuZnVuY3Rpb24gbmV3R2FtZShpLCBqKSB7XG4gIHJldHVybiB7XG4gICAgZ2FtZUJvYXJkOiBjb29yZGluYXRlRmFjdG9yeSgpLFxuICAgIGtuaWdodDoga25pZ2h0RmFjdG9yeShpLCBqKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvb3JkaW5hdGVGYWN0b3J5KCkge1xuICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcbiAgZm9yKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGZvcihsZXQgaiA9IDA7IGogPCA4OyBqKyspXG4gICAgY29vcmRpbmF0ZXMucHVzaChbaSwgal0pO1xuICB9XG4gIHJldHVybiBjb29yZGluYXRlc1xufVxuXG5mdW5jdGlvbiBrbmlnaHRGYWN0b3J5KGksIGopIHtcbiAgaWYgKGkgPCAwIHx8IGogPCAwIHx8IGkgPiA3IHx8IGogPiA3KSByZXR1cm4gbnVsbDtcbiAgXG4gIHJldHVybiBbaSxqXVxufVxuXG5leHBvcnQgeyBuZXdHYW1lIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBrbmlnaHRNb3ZlcyB9IGZyb20gXCIuL2tuaWdodE1vdmVzXCI7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==