/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for (let i = 0; i < HEIGHT; i++) {
    //Source: (https://stackoverflow.com/questions/4852017/how-to-initialize-an-arrays-length-in-javascript, accessed 5 March 2022)
    board.push(Array.apply(null, Array(WIDTH)).map(function () {}));
  }
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  // Create top row of game board. 
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  // Add event listener for a click event on the top row using the 
  // handleClick function. 
  top.addEventListener("click", handleClick);

  // For the defined width of the row...
  for (var x = 0; x < WIDTH; x++) {
    // ...create the head of the table. 
    var headCell = document.createElement("td");
    // Give headCell id of x. 
    headCell.setAttribute("id", x);
    // Append headCell to tr. 
    top.append(headCell);
  }
  // Append top of board to table element with id "board"
  htmlBoard.append(top);

  // TODO: add comment for this code
  // For the defined height of the row...
  for (var y = 0; y < HEIGHT; y++) {
    // ...create new table row. 
    const row = document.createElement("tr");

    // 
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // Set the id of the cell to the y coordinate minus the x coordinate
      // (both increment by one each time their respective for loop 
      // executes). 
      cell.setAttribute("id", `${y}-${x}`);
      // Append cell to table row. 
      row.append(cell);
    }
    // Append each row to the HTML table until the max defined height is 
    // reached.
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  const div = document.createElement('div');
  div.classList.add('piece');
  div.classList.add(`p${currPlayer}`);

  const clickPoint = document.getElementById(`${y}-${x}`);
  clickPoint.append(div);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(`Game over! ${currPlayer} wins!'`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  
  // Source: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every, accessed 5 March 2022)
  // Check if every cell contains a filled cell and every row contains all
  // filled cells. 
  if (board.every(row => row.every(cell => cell))) {
    alert('Game over: it\'s a tie!');
  }

  // switch players
  if (currPlayer = 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // Iterate for each column of the board. 
  for (var y = 0; y < HEIGHT; y++) {
    // Iterate for each row of the board. 
    for (var x = 0; x < WIDTH; x++) {
      // Add one to x to continue adding onto the x axis of the board. 
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // Add one to y to continue adding onto the y axis of the board. 
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // Each pair goes diagonally to the right (ascending).  
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // Each pair goes diagonally to the left (decending). 
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // Pass each win condition into the win method of the checkForWin()
      // function. 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
