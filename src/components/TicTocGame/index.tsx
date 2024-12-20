"use client";
// 引入 井字棋 样式
import "./index.css";
import { useState } from "react";
function Square({
  value,
  OnSqaureClick,
}: {
  value: string;
  OnSqaureClick: () => void;
}) {
  return (
    <button className={"square"} onClick={OnSqaureClick}>
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} OnSqaureClick={() => handleClick(0)} />
        <Square value={squares[1]} OnSqaureClick={() => handleClick(1)} />
        <Square value={squares[2]} OnSqaureClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} OnSqaureClick={() => handleClick(3)} />
        <Square value={squares[4]} OnSqaureClick={() => handleClick(4)} />
        <Square value={squares[5]} OnSqaureClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} OnSqaureClick={() => handleClick(6)} />
        <Square value={squares[7]} OnSqaureClick={() => handleClick(7)} />
        <Square value={squares[8]} OnSqaureClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
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
    <div className={"game"}>
      <div className={"game-board"}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className={"game-info"}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
