let currentPlayer = "X";
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let start = document.getElementById("start");
let playerWrapper = document.getElementById("player-wrapper");
let playerButt = document.getElementById("player-butt");
let computerButt = document.getElementById("computer-butt");
let reset = document.getElementById("reset");
let collapseForm = document.getElementById("form-wrapper");
let p2Comp = document.getElementById("p2Comp");
let playerTurn = document.getElementById("player-turn");
let timer = document.getElementById("timer");
let timeElapsed;
let credit = document.getElementById("credit");
let hundredthSec = document.getElementById("hundredth-sec");
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let allCells = document.querySelectorAll(".cell");
let cell1 = document.getElementById("cell1");
let cell2 = document.getElementById("cell2");
let cell3 = document.getElementById("cell3");
let cell4 = document.getElementById("cell4");
let cell5 = document.getElementById("cell5");
let cell6 = document.getElementById("cell6");
let cell7 = document.getElementById("cell7");
let cell8 = document.getElementById("cell8");
let cell9 = document.getElementById("cell9");
let cellKey = {
  cell1: cell1,
  cell2: cell2,
  cell3: cell3,
  cell4: cell4,
  cell5: cell5,
  cell6: cell6,
  cell7: cell7,
  cell8: cell8,
  cell9: cell9,
};
let xMoves = [];
let oMoves = [];
let totalMoves = [];
let gameBoard = {
  playerMove(event) {
    if (!event.target.textContent) {
      if (currentPlayer === "X") {
        event.target.textContent = "X";
        currentPlayer = "O";
        playerTurn.innerHTML = "It's " + player2.value + "'s turn";
        let item = event.target;
        item = item.outerHTML.toString();
        item = item.slice(9, 14);
        xMoves.push(item);
        totalMoves.push(event.target);
      } else if (currentPlayer === "O") {
        event.target.textContent = "O";
        currentPlayer = "X";
        playerTurn.innerHTML = "It's " + player1.value + "'s turn";
        let item = event.target;
        item = item.outerHTML.toString();
        item = item.slice(9, 14);
        oMoves.push(item);
        totalMoves.push(event.target);
      }
      checkWin();
    } else alert("You can't play there!");
  },
  computerMove(event) {
    if (currentPlayer === "X") {
      if (!event.target.textContent) {
        event.target.textContent = "X";
        currentPlayer = "O";
        playerTurn.innerHTML = "It's the " + player2.value + "'s turn";
        let item = event.target;
        item = item.outerHTML.toString();
        item = item.slice(9, 14);
        xMoves.push(item);
        totalMoves.push(event.target);
        checkWin();
        setTimeout(function () {
          gameBoard.computerMove(event);
        }, 1500);
      }
      else alert("You can't play there!");
    } else if (currentPlayer === "O") {
      let cellNum = Math.floor(Math.random() * 9);
      let compChoice = allCells[cellNum];
      if (!compChoice.textContent) {
        compChoice.textContent = "O";
        currentPlayer = "X";
        playerTurn.innerHTML = "It's " + player1.value + "'s turn";
        let item = compChoice;
        item = item.outerHTML.toString();
        item = item.slice(9, 14);
        oMoves.push(item);
        totalMoves.push(event.target);
        checkWin();
      } else if (compChoice.textContent) {
        gameBoard.computerMove(event);
      }
    }
  },
};
let winningArrays = [
  ["cell1", "cell2", "cell3"],
  ["cell4", "cell5", "cell6"],
  ["cell7", "cell8", "cell9"],
  ["cell1", "cell4", "cell7"],
  ["cell2", "cell5", "cell8"],
  ["cell3", "cell6", "cell9"],
  ["cell1", "cell5", "cell9"],
  ["cell3", "cell5", "cell7"],
];
function checkWin() {
for (let item of winningArrays) {
    if (
      xMoves.includes(item[0].toString()) &&
      xMoves.includes(item[1].toString()) &&
      xMoves.includes(item[2].toString())
    ) {
      let winningCell1 = item[0];
      let winningCell2 = item[1];
      let winningCell3 = item[2];
      cellKey[winningCell1].style.backgroundColor = "red";
      cellKey[winningCell2].style.backgroundColor = "red";
      cellKey[winningCell3].style.backgroundColor = "red";
      if (minutes.innerHTML == 00) {
        playerTurn.textContent = `Congratulations, ${player1.value}, you won!!! It took you ${seconds.innerHTML} seconds!`;
      } else if (minutes.innerHTML !== 0) {
        playerTurn.textContent = `Congratulations, ${player1.value}, you won!!! It took you ${minutes.innerHTML} minutes and ${seconds.innerHTML} seconds!`;
      }
      clearInterval(timeElapsed);
      credit.style.display = "block";
      reset.style.display = "block";
    }
    else if (
      oMoves.includes(item[0].toString()) &&
      oMoves.includes(item[1].toString()) &&
      oMoves.includes(item[2].toString())
    )
     {
      let winningCell1 = item[0];
      let winningCell2 = item[1];
      let winningCell3 = item[2];
      cellKey[winningCell1].style.backgroundColor = "red";
      cellKey[winningCell2].style.backgroundColor = "red";
      cellKey[winningCell3].style.backgroundColor = "red";
      if (minutes.innerHTML == 00) {
        playerTurn.textContent = `Congratulations, ${player2.value}, you won!!! It took you ${seconds.innerHTML} seconds!`;
      }
      else if (minutes.innerHTML !== 0) {
        playerTurn.textContent = `Congratulations, ${player2.value}, you won!!! It took you ${minutes.innerHTML} minutes and ${seconds.innerHTML} seconds!`;
      }
      clearInterval(timeElapsed);
      credit.style.display = "block";
      reset.style.display = "block";
    }
  }
  if (totalMoves.length === 9) {
    playerTurn.textContent = "No winner";
    clearInterval(timeElapsed);
    credit.style.display = "block";
    reset.style.display = "block";
  }
}
start.addEventListener("click", startFun);
playerButt.addEventListener("click", revealForm);
computerButt.addEventListener("click", revealForm2);
reset.addEventListener("click", resetGame);
function resetGame() {
  location.reload();
}
function revealForm() {
  collapseForm.style.display = "block";
  player2.value = "Player 2";
  playerWrapper.style.display = "none"; 
  computerButt.style.display = "none";
}
function revealForm2() {
  computerButt.style.display = "none";
  player2.style.display = "none";
  player2.value = "Computer";
  p2Comp.textContent = "Player 2: Computer";
  collapseForm.style.display = "block";
  playerWrapper.style.display = "none";
}
let counter = () => {
  if (hundredthSec.innerHTML < 100) {
    hundredthSec.innerHTML++;
  } else if (seconds.innerHTML == 59 && hundredthSec.innerHTML == 100) {
    seconds.innerHTML++;
    minutes.innerHTML++;
    seconds.innerHTML = 0;
    hundredthSec.innerHTML = 0;
  } else if (hundredthSec.innerHTML == 100) {
    seconds.innerHTML++;
    hundredthSec.innerHTML = 0;
  }
};
function startFun(event) {
  event.preventDefault();
  if (player1.value && player2.value === "Computer") {
    for (let cell of allCells) {
      cell.addEventListener("click", gameBoard.computerMove);
    }
    playerTurn.style.border = "5px double #66FCF1";
    playerTurn.innerHTML = "It's " + player1.value + "'s turn!";
    start.disabled = true;
    timeElapsed = setInterval(counter, 10);
  } 
  else if (player1.value && player2.value) {
    for (let cell of allCells) {
      cell.addEventListener("click", gameBoard.playerMove);
    }
    playerTurn.style.border = "5px double #66FCF1";
    playerTurn.innerHTML = "It's " + player1.value + "'s turn!";
    start.disabled = true;
    timeElapsed = setInterval(counter, 10);
  } else if (!player1.value && player2.value === "Computer") {
    alert("Please enter a name for Player 1!");
  } else alert("Please enter a name for Player 1 and Player 2!");
}