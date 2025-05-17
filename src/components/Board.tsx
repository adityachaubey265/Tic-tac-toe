import React from 'react';
import Cell from './Cell';
import { GameBoard, Player, WinningLine } from '../types';

interface BoardProps {
  board: GameBoard;
  onCellClick: (row: number, col: number) => void;
  gameOver: boolean;
  winner: Player | 'DRAW' | null;
  winningLine: WinningLine;
}

const Board: React.FC<BoardProps> = ({ 
  board, 
  onCellClick, 
  winningLine 
}) => {
  const size = board.length;
  
  return (
    <div 
      className={`
        grid gap-1 md:gap-2 w-full max-w-lg mx-auto
        border-2 border-slate-300 dark:border-slate-600 rounded-lg
        bg-slate-200 dark:bg-slate-700 p-2
        shadow-lg transition-all duration-300
      `}
      style={{ 
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`
      }}
    >
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            position={{ row: rowIndex, col: colIndex }}
            winningLine={winningLine}
            boardSize={size}
          />
        ))
      ))}
    </div>
  );
};

export default React.memo(Board);