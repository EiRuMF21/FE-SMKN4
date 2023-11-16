import { useState } from "react";

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = "X";

    if (xIsNext === true) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = "";

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquaresClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquaresClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquaresClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquaresClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquaresClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquaresClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquaresClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquaresClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquaresClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquaresClick }) {
  return (
    <button className="square" onClick={onSquaresClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 == 0);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    // garis horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //  garis vertikal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // garis diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let z = 0; z < lines.length; z++) {
    const a = lines[z][0];
    const b = lines[z][1];
    const c = lines[z][2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log = "Sudah ada yang menang";
      return squares[a];
    }
  }
  console.log = "Belum ada yang menang";
  return false;
}
