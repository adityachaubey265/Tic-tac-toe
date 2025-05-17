import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, RotateCcw, RefreshCw, Award } from 'lucide-react';

interface GameControlsProps {
  boardSize: number;
  onSizeChange: (size: number) => void;
  onReset: () => void;
  onUndo: () => void;
  onResetStats: () => void;
  canUndo: boolean;
  xWins: number;
  oWins: number;
  draws: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  boardSize,
  onSizeChange,
  onReset,
  onUndo,
  onResetStats,
  canUndo,
  xWins,
  oWins,
  draws
}) => {
  const { theme, toggleTheme } = useTheme();
  const [customSize, setCustomSize] = useState<number>(boardSize);
  const [showCustom, setShowCustom] = useState(false);

  const handleSizeChange = (size: number) => {
    onSizeChange(size);
  };

  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 3 && value <= 10) {
      setCustomSize(value);
    }
  };

  const applyCustomSize = () => {
    onSizeChange(customSize);
    setShowCustom(false);
  };

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Game Controls</h2>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 
                    hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            Board Size
          </label>
          <div className="flex flex-wrap gap-2">
            {[3, 4, 5].map(size => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${boardSize === size ? 
                    'bg-indigo-600 text-white' : 
                    'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'}
                `}
              >
                {size}×{size}
              </button>
            ))}
            <button
              onClick={() => setShowCustom(!showCustom)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                ${boardSize !== 3 && boardSize !== 4 && boardSize !== 5 ? 
                  'bg-indigo-600 text-white' : 
                  'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'}
              `}
            >
              Custom
            </button>
          </div>
        </div>

        {showCustom && (
          <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
              Custom Size (3-10)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="3"
                max="10"
                value={customSize}
                onChange={handleCustomSizeChange}
                className="w-20 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md
                          bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
              <button
                onClick={applyCustomSize}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium
                          hover:bg-indigo-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500 text-white rounded-md text-sm font-medium
                     hover:bg-rose-600 transition-colors"
          >
            <RefreshCw size={16} />
            New Game
          </button>
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${canUndo ? 
                'bg-amber-500 text-white hover:bg-amber-600' : 
                'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'}
            `}
          >
            <RotateCcw size={16} />
            Undo Move
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200">
            <Award size={18} />
            Game Stats
          </h3>
          <button
            onClick={onResetStats}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Reset Stats
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold">X</div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{xWins}</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded">
            <div className="text-amber-500 dark:text-amber-400 font-bold">Draws</div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{draws}</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded">
            <div className="text-rose-500 dark:text-rose-400 font-bold">O</div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{oWins}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameControls);