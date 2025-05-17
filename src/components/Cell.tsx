import React from 'react';
import { CellValue, WinningLine } from '../types';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  winning?: boolean;
  position: { row: number; col: number };
  winningLine: WinningLine;
  boardSize: number;
}

const Cell: React.FC<CellProps> = ({ 
  value, 
  onClick, 
  position, 
  winningLine, 
  boardSize 
}) => {
  const isWinningCell = React.useMemo(() => {
    if (!winningLine) return false;
    const { row, col } = position;
    const winSize = boardSize <= 3 ? 3 : boardSize === 4 ? 4 : 5;

    switch (winningLine.type) {
      case 'row':
        return row === winningLine.index && 
               col >= winningLine.start! && 
               col < winningLine.start! + winSize;
      case 'column':
        return col === winningLine.index && 
               row >= winningLine.start! && 
               row < winningLine.start! + winSize;
      case 'diagonal':
        return row - winningLine.index === col - winningLine.start! && 
               row >= winningLine.index && 
               row < winningLine.index + winSize;
      case 'diagonal-reverse':
        return row - winningLine.index === winningLine.start! - col && 
               row >= winningLine.index && 
               row < winningLine.index + winSize;
      default:
        return false;
    }
  }, [position, winningLine, boardSize]);

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square flex items-center justify-center text-4xl font-bold
        transition-all duration-300 ease-in-out
        border border-slate-300 dark:border-slate-600
        ${isWinningCell ? 'bg-indigo-100 dark:bg-indigo-900' : 
          'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'}
        ${value === 'X' ? 'text-indigo-600 dark:text-indigo-400' : 
          value === 'O' ? 'text-rose-500 dark:text-rose-400' : ''}
      `}
      disabled={value !== null}
      aria-label={value ? `Cell marked with ${value}` : 'Empty cell'}
    >
      {value && (
        <span className="transform transition-all duration-300 ease-bounce scale-in-center">
          {value}
        </span>
      )}
    </button>
  );
};

export default React.memo(Cell);