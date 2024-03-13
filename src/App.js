import React, { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick, isWinning }) {
  const className = "square" + (isWinning ? " winning-square" : "");
  
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const win = calw(squares);
  const winner=calculateWinner(squares)
  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let status;
  if (win) {
    status = 'Winner: ' + ((win==='X')? "player1 ":"player2");
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinning={winner && winner.includes(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    
    setCurrentMove(nextMove);
  }

  // Split the moves list into two lists, one for each player
  const movesPlayer1 = history.map((squares, move) => {
    let description;
    if (move % 2 !== 0 ) {
      description = 'Go to move #' + move;
      return (
        <li key={move}>
          <button className='ins' onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
   
    return null;
  });

  const movesPlayer2 = history.map((squares, move) => {
    let description;
    if (move % 2 === 0 && move!==0) {
      description = 'Go to move #' + move;
      return (
        <li key={move}>
          <button className='ins' onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
    return null;
  });
  const startmove = history.map((squares, move) => {
    let description;
    if (move=== 0) {
      description = 'Start Game';
      return (
        <li key={move}>
          <button className='ins' onClick={() => window.location.reload(false)}>{description}</button>
        </li>
      );
    }
    return null;
  });
  return (
    <div className="game">
    
    <div className="moves-left">
          <h2>Player 1 Moves</h2>
          <ol >{movesPlayer1}</ol>
        </div>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="moves-left">
          <h2>Game start</h2>
          <ol >{startmove}</ol>
        </div>
      </div>
      
        <div className="moves-right">
          <h2>Player 2 Moves</h2>
          <ol>{movesPlayer2}</ol>
        </div>
        </div>
 
  );
}
function calw(squares) {
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

function calculateWinner(squares) {
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
      return [a, b, c];
    }
  }
  return null;
}

export default App;
