import { useState, useEffect } from "react";

type CellValue = "X" | "O" | null;

type Board = CellValue[][];

function App() {
  const [turn, setTurn] = useState<string>("X");
  const [board, setBoard] = useState<Board>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const updateValue = (rowI: number, colI: number) => {
    if (board[rowI][colI] !== null) return;
    let newBoard = [...board];

    newBoard[rowI][colI] = turn as CellValue;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  // Check for win
  useEffect(() => {
    const checkWinTurn = () => {
      if (turn === "X") {
        return "O";
      } else {
        return "X";
      }
    };

    // Row win case
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] !== null &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        alert(`${checkWinTurn()} won`);
      }
    }

    // Column win case
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] !== null &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        alert(`${checkWinTurn()} won`);
      }
    }

    // Diagonal win case
    if (
      board[0][0] !== null &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      alert(`${checkWinTurn()} won`);
    }

    if (
      board[0][2] !== null &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      alert(`${checkWinTurn()} won`);
    }
  }, [board]);

  // Check for tie
  useEffect(() => {
    let checker = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] !== null) {
          checker.push(board[row][col])
        }
      }
    }
    if (checker.length == 9) {
      alert("Tie")
    }
  }, [board])

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>
      <div className="grid grid-rows-3 grid-cols-3 gap-3">
        {board.map((row, rowI) =>
          //@ts-ignore
          row.map((col, colI) => (
            <button
              className="h-20 w-20 bg-gray-700 text-2xl font-bold text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
              onClick={() => updateValue(rowI, colI)}
              key={`${rowI}-${colI}`}
            >
              {board[rowI][colI]}
            </button>
          ))
        )}
      </div>
      <p className="mt-6 text-lg">
        Current Turn: <span className="font-bold">{turn}</span>
      </p>
    </div>
  );
}

export default App;

