import "./styles.css";
import React from "react";

const rowStyle = {
  display: "flex"
};

function getColStyles(rows, col) {
  let styleObj = {
    height: "50px",
    width: "50px"
  };

  if (rows === 0) {
    styleObj["borderBottomStyle"] = "solid";
    styleObj["borderLeftStyle"] = "none";
    if (col === 0 || col === 1) {
      styleObj["borderRightStyle"] = "solid";
    }
  } else if (rows === 1) {
    styleObj["borderBottomStyle"] = "solid";
    styleObj["borderLeftStyle"] = "none";
    if (col === 0 || col === 1) {
      styleObj["borderRightStyle"] = "solid";
    }
  } else {
    if (col === 0 || col === 1) {
      styleObj["borderRightStyle"] = "solid";
    }
  }

  return styleObj;
}

export default function App() {
  const [board, setBoard] = React.useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  const [instruction, setInstruction] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [player, setPlayer] = React.useState(false);
  const [winner, setWinner] = React.useState("");

  const handleClick = (rows, col) => {
    setBoard((prev) => {
      const newBoard = [...prev];
      if (!newBoard[rows][col]) {
        newBoard[rows][col] = player ? "x" : "0";
        setPlayer(!player);
      }
      return newBoard;
    });
  };

  React.useEffect(() => {
    checkIsGameOver();
  }, [board]);

  React.useEffect(() => {
    if (isGameOver) {
      setInstruction(`Game Over! Winner: ${winner}`);
    } else {
      if (player) {
        setInstruction("Player 2's turn");
      } else {
        setInstruction("Player 1's turn");
      }
    }
  }, [player, isGameOver]);

  const checkIsGameOver = () => {
    const isSame = (line) => {
      let result = true;

      for (let i = 0; i < line.length - 1; i++) {
        if (line[i] !== line[i + 1]) {
          result = false;
          break;
        }
      }
      if (result) {
        if (line[0] === "x") {
          setWinner("Player 2");
        } else {
          setWinner("Player 1");
        }
        setIsGameOver(true);
      }
      return result;
    };

    for (let i = 0; i < 3; i++) {
      let row = "";
      let col = "";

      for (let j = 0; j < 3; j++) {
        row += board[i][j];
        col += board[j][i];
      }
      if (
        (row.length === 3 && isSame(row)) ||
        (col.length === 3 && isSame(col))
      ) {
        break;
      }
    }

    let dia = "";

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j) {
          dia += board[i][j];
        }
      }
      dia.length === 3 && isSame(dia);
    }

    dia = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i + j === 2) {
          dia += board[i][j];
        }
      }
      dia.length === 3 && isSame(dia);
    }
  };

  const resetBoard = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    setIsGameOver(false);
    setPlayer(false);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>{instruction}</h2>
      {board.map((row, rows) => {
        return (
          <div key={`row-${rows}`} style={rowStyle}>
            {row.map((cell, col) => {
              return (
                <div
                  key={`col-${col}`}
                  style={getColStyles(rows, col)}
                  onClick={() => !isGameOver && handleClick(rows, col)}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}
