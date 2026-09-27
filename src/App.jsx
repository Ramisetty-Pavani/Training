import { useState } from "react";

function App() {
  const [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", ""
  ]);

  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function checkWinner(cells) {
    for (let i = 0; i < winningPatterns.length; i++) {
      const pattern = winningPatterns[i];

      const a = pattern[0];
      const b = pattern[1];
      const c = pattern[2];

      if (
        cells[a] !== "" &&
        cells[a] === cells[b] &&
        cells[b] === cells[c]
      ) {
        return cells[a];
      }
    }

    return "";
  }

  function handleClick(index) {
    if (board[index] !== "" || winner !== "") {
      return;
    }

    const newBoard = board.slice();

    newBoard[index] = turn;

    setBoard(newBoard);

    const result = checkWinner(newBoard);

    if (result !== "") {
      setWinner(result);
      return;
    }

    let isDraw = true;

    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        isDraw = false;
        break;
      }
    }

    if (isDraw) {
      setWinner("Draw");
      return;
    }

    if (turn === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
  }

  function resetGame() {
    setBoard([
      "", "", "",
      "", "", "",
      "", "", ""
    ]);

    setTurn("X");
    setWinner("");
  }

  let message = "Player " + turn + " Turn";

  if (winner === "X") {
    message = "Player X Wins!";
  }

  if (winner === "O") {
    message = "Player O Wins!";
  }

  if (winner === "Draw") {
    message = "Game Draw!";
  }

  return (
    <div style={styles.page}>
      <div style={styles.game}>
        <h1 style={styles.title}>Tic Tac Toe</h1>

        <h2 style={styles.message}>{message}</h2>

        <div style={styles.board}>
          {board.map(function (cell, index) {
            return (
              <button
                key={index}
                onClick={function () {
                  handleClick(index);
                }}
                style={styles.cell}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <button
          onClick={resetGame}
          style={styles.reset}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f2f2"
  },

  game: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
  },

  title: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  message: {
    fontSize: "22px",
    marginBottom: "20px"
  },

  board: {
    display: "grid",
    gridTemplateColumns: "100px 100px 100px",
    gap: "8px",
    justifyContent: "center",
    marginBottom: "25px"
  },

  cell: {
    width: "100px",
    height: "100px",
    fontSize: "40px",
    fontWeight: "bold",
    cursor: "pointer",
    background: "#eeeeee",
    border: "2px solid #333333",
    borderRadius: "8px"
  },

  reset: {
    padding: "12px 25px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    background: "#333333",
    color: "white"
  }
};

export default App;