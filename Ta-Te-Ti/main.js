const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let turn = 0; //0 = user , 1 = PC
const boardContainer = document.querySelector("#board");
const playerDiv = document.querySelector("#player");

startGame();

function startGame() {
  renderBoard();
  turn = Math.random() < 0.5 ? 0 : 1;

  renderCurrentPlayer();

  if (turn === 0) {
    playerPlays();
  } else {
    PcPlays();
  }
}

function playerPlays() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, i) => {
    const column = i % 3;
    const row = parseInt(i / 3);

    if (board[row][column] === "") {
      cell.addEventListener("click", (e) => {
        board[row][column] = "O";
        cell.textContent = board[row][column];
      });
    }
  });
}

function PcPlays() {
  renderCurrentPlayer();

  setTimeout(() => {
    let played = false;
  }, 1500);
}

function renderCurrentPlayer() {
  playerDiv.textContent = `${turn === 0 ? "Player Turn" : "PC turn"}`;
}

function renderBoard() {
  const html = board.map((row) => {
    const cells = row.map((cell) => {
      return `<button class='cell'>${cell}</button>`;
    });
    return `<div class='row'>${cells.join("")}</div>`;
  });
  boardContainer.innerHTML = html.join("");
}
