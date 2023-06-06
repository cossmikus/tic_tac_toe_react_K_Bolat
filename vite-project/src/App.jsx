

import { useState, useEffect } from 'react';

function App() {
  const [xIsNext, setXIsNext] = useState(true);

  const [squares, setSquares] = useState(() => {
    const storedSquares = localStorage.getItem('squares');
    return storedSquares ? JSON.parse(storedSquares) : Array(9).fill(null);
  });

  const winner = who_is_winner(squares);

  function click_action(i) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function reset_funct() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  useEffect(() => {
    localStorage.setItem('squares', JSON.stringify(squares));
  }, [squares]);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (check_board_full(squares)) {
    status = 'Draw: Nobody wins';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Tic-tac-toe game influenced by react.dev tutorial</h1>
      <h1 className="text-2xl font-bold">Kassymkhan Bolat</h1>
      <div className="grid grid-cols-3 gap-0.5">
        <MyButton value={squares[0]} onClick={() => click_action(0)} />
        <MyButton value={squares[1]} onClick={() => click_action(1)} />
        <MyButton value={squares[2]} onClick={() => click_action(2)} />
        <MyButton value={squares[3]} onClick={() => click_action(3)} />
        <MyButton value={squares[4]} onClick={() => click_action(4)} />
        <MyButton value={squares[5]} onClick={() => click_action(5)} />
        <MyButton value={squares[6]} onClick={() => click_action(6)} />
        <MyButton value={squares[7]} onClick={() => click_action(7)} />
        <MyButton value={squares[8]} onClick={() => click_action(8)} />
      </div>

      <p className="mt-4 text-2xl font-bold">{status}</p>

      <button
        className="mt-4 px-4 py-2 bg-gray-500  font-bold rounded"
        onClick={reset_funct}
      >
        Reset Game
      </button>
    </div>
  );
}

function MyButton({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 border border-black rounded-none font-bold flex items-center justify-center"
    >
      {value}
    </button>
  );
}

function who_is_winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

function check_board_full(squares) {
  return squares.every((square) => square !== null);
}

export default App;

