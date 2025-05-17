import React from 'react';
import { Player, PlayerNames } from '../types';

interface GameStatusProps {
  currentPlayer: Player;
  winner: Player | 'DRAW' | null;
  gameOver: boolean;
  winCondition: number;
  playerNames: PlayerNames;
}

const GameStatus: React.FC<GameStatusProps> = ({ 
  currentPlayer, 
  winner, 
  gameOver, 
  winCondition,
  playerNames 
}) => {
  let message: string;
  let colorClass: string;

  if (gameOver) {
    if (winner === 'DRAW') {
      message = "It's a draw!";
      colorClass = "text-amber-500 dark:text-amber-400";
    } else {
      message = `${playerNames[winner!]} wins!`;
      colorClass = winner === 'X' ? 
        "text-indigo-600 dark:text-indigo-400" : 
        "text-rose-500 dark:text-rose-400";
    }
  } else {
    message = `${playerNames[currentPlayer]}'s turn`;
    colorClass = currentPlayer === 'X' ? 
      "text-indigo-600 dark:text-indigo-400" : 
      "text-rose-500 dark:text-rose-400";
  }

  return (
    <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto">
      <h2 className={`text-xl font-bold ${colorClass} transition-colors`}>
        {message}
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
        {winCondition > 3 && `Get ${winCondition} in a row to win`}
      </p>
    </div>
  );
};

export default React.memo(GameStatus);