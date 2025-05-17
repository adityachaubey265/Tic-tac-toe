import React from 'react';
import Board from './Board';
import GameControls from './GameControls';
import GameStatus from './GameStatus';
import PlayerNameInput from './PlayerNameInput';
import { useGameState } from '../hooks/useGameState';

const GameLayout: React.FC = () => {
  const {
    gameState,
    boardSize,
    winCondition,
    makeMove,
    undoMove,
    resetGame,
    resetStats,
    updatePlayerName
  } = useGameState(3);

  const handleSizeChange = (size: number) => {
    resetGame(size);
  };

  const canUndo = gameState.history.length > 0 && !gameState.undoUsed;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <GameStatus
        currentPlayer={gameState.currentPlayer}
        winner={gameState.winner}
        gameOver={gameState.gameOver}
        winCondition={winCondition}
        playerNames={gameState.playerNames}
      />
      
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="md:col-span-3 order-2 md:order-1">
          <PlayerNameInput
            playerNames={gameState.playerNames}
            onNameChange={updatePlayerName}
          />
          <Board
            board={gameState.board}
            onCellClick={makeMove}
            gameOver={gameState.gameOver}
            winner={gameState.winner}
            winningLine={gameState.winningLine}
          />
        </div>
        
        <div className="md:col-span-2 order-1 md:order-2">
          <GameControls
            boardSize={boardSize}
            onSizeChange={handleSizeChange}
            onReset={() => resetGame()}
            onUndo={undoMove}
            onResetStats={resetStats}
            canUndo={canUndo}
            xWins={gameState.playerXWins}
            oWins={gameState.playerOWins}
            draws={gameState.draws}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLayout;