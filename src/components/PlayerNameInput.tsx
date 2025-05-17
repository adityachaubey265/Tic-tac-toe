import React from 'react';
import { Player, PlayerNames } from '../types';
import { UserCircle } from 'lucide-react';

interface PlayerNameInputProps {
  playerNames: PlayerNames;
  onNameChange: (player: Player, name: string) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ playerNames, onNameChange }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md mb-4">
      <h3 className="text-md font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200 mb-3">
        <UserCircle size={18} />
        Player Names
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="player-x" 
            className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1"
          >
            Player X
          </label>
          <input
            type="text"
            id="player-x"
            value={playerNames.X}
            onChange={(e) => onNameChange('X', e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md
                     bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-50"
            placeholder="Enter name"
            maxLength={20}
          />
        </div>
        <div>
          <label 
            htmlFor="player-o" 
            className="block text-sm font-medium text-rose-500 dark:text-rose-400 mb-1"
          >
            Player O
          </label>
          <input
            type="text"
            id="player-o"
            value={playerNames.O}
            onChange={(e) => onNameChange('O', e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md
                     bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200
                     focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:ring-opacity-50"
            placeholder="Enter name"
            maxLength={20}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlayerNameInput);