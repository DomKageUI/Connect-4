import React, { useState } from 'react';
import './App.css';

const ROWS = 6;
const COLS = 7;

const initialBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const dropToken = (col) => {
    if (winner || isColumnFull(col)) return;

    const updatedBoard = [...board];
    let row = findNextAvailableRow(col);

    if (row === -1) return; // Column is full

    updatedBoard[row][col] = currentPlayer;
    setBoard(updatedBoard);

    if (checkWinner(row, col)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const isColumnFull = (col) => {
    return board[0][col] !== null;
  };

  const findNextAvailableRow = (col) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        return row;
      }
    }
    return -1; // Column is full
  };

  const checkWinner = (row, col) => {
    const directions = [
      [1, 0], // vertical
      [0, 1], // horizontal
      [1, 1], // diagonal /
      [1, -1], // diagonal \
    ];

    for (const [dr, dc] of directions) {
      let count = 1; // count consecutive tokens
      count += countDirection(row, col, dr, dc); // check in one direction
      count += countDirection(row, col, -dr, -dc); // check in opposite direction

      if (count >= 4) {
        return true;
      }
    }

    return false;
  };

  const countDirection = (row, col, dr, dc) => {
    const player = board[row][col];
    let count = 0;

    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }

    return count;
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div key={colIndex} className="cell" onClick={() => dropToken(colIndex)}>
            {cell}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Dom's Connect Four</h1>
      {!winner && <p>Current Player: {currentPlayer}</p>}
      {winner && <p>Winner: {winner}</p>}
      <div className="board">{renderBoard()}</div>
    </div>
  );
};

export default App;
