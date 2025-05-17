import { GameBoard, Player, CellValue, WinningLine } from '../types';

export const createBoard = (size: number): GameBoard => {
  return Array(size).fill(null).map(() => Array(size).fill(null));
};

export const checkWinner = (board: GameBoard, winCondition: number): { winner: CellValue; winningLine: WinningLine } => {
  const size = board.length;
  
  // Check rows
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - winCondition; col++) {
      const firstCell = board[row][col];
      if (firstCell !== null) {
        let match = true;
        for (let i = 1; i < winCondition; i++) {
          if (board[row][col + i] !== firstCell) {
            match = false;
            break;
          }
        }
        if (match) return { 
          winner: firstCell, 
          winningLine: { type: 'row', index: row, start: col }
        };
      }
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - winCondition; row++) {
      const firstCell = board[row][col];
      if (firstCell !== null) {
        let match = true;
        for (let i = 1; i < winCondition; i++) {
          if (board[row + i][col] !== firstCell) {
            match = false;
            break;
          }
        }
        if (match) return { 
          winner: firstCell, 
          winningLine: { type: 'column', index: col, start: row }
        };
      }
    }
  }

  // Check diagonals (top-left to bottom-right)
  for (let row = 0; row <= size - winCondition; row++) {
    for (let col = 0; col <= size - winCondition; col++) {
      const firstCell = board[row][col];
      if (firstCell !== null) {
        let match = true;
        for (let i = 1; i < winCondition; i++) {
          if (board[row + i][col + i] !== firstCell) {
            match = false;
            break;
          }
        }
        if (match) return { 
          winner: firstCell, 
          winningLine: { type: 'diagonal', index: row, start: col }
        };
      }
    }
  }

  // Check diagonals (top-right to bottom-left)
  for (let row = 0; row <= size - winCondition; row++) {
    for (let col = size - 1; col >= winCondition - 1; col--) {
      const firstCell = board[row][col];
      if (firstCell !== null) {
        let match = true;
        for (let i = 1; i < winCondition; i++) {
          if (board[row + i][col - i] !== firstCell) {
            match = false;
            break;
          }
        }
        if (match) return { 
          winner: firstCell, 
          winningLine: { type: 'diagonal-reverse', index: row, start: col }
        };
      }
    }
  }

  // Check for draw
  const isDraw = board.every(row => row.every(cell => cell !== null));
  if (isDraw) return { winner: 'DRAW', winningLine: null };

  return { winner: null, winningLine: null };
};

export const getWinCondition = (boardSize: number): number => {
  if (boardSize <= 3) return 3;
  if (boardSize === 4) return 4;
  return Math.min(5, boardSize);
};

export const getNextPlayer = (currentPlayer: Player): Player => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

export const deepCloneBoard = (board: GameBoard): GameBoard => {
  return board.map(row => [...row]);
};