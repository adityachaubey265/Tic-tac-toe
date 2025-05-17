import { useState, useCallback } from 'react';
import { 
  GameState, 
  Player, 
  GameHistory, 
  GameBoard,
  PlayerNames 
} from '../types';
import { 
  createBoard, 
  checkWinner, 
  getNextPlayer, 
  getWinCondition, 
  deepCloneBoard 
} from '../utils/gameLogic';

const DEFAULT_NAMES: PlayerNames = {
  X: 'Player X',
  O: 'Player O'
};

export const useGameState = (initialSize: number = 3) => {
  const [boardSize, setBoardSize] = useState(initialSize);
  const [gameState, setGameState] = useState<GameState>(() => {
    return {
      board: createBoard(initialSize),
      currentPlayer: 'X',
      winner: null,
      gameOver: false,
      history: [],
      playerXWins: 0,
      playerOWins: 0,
      draws: 0,
      undoUsed: false,
      winningLine: null,
      playerNames: DEFAULT_NAMES
    };
  });

  const winCondition = getWinCondition(boardSize);

  const makeMove = useCallback((row: number, col: number) => {
    if (gameState.board[row][col] !== null || gameState.gameOver) {
      return;
    }

    const newHistory: GameHistory[] = [
      ...gameState.history,
      {
        boardState: deepCloneBoard(gameState.board),
        currentPlayer: gameState.currentPlayer
      }
    ];

    const newBoard = deepCloneBoard(gameState.board);
    newBoard[row][col] = gameState.currentPlayer;

    const { winner, winningLine } = checkWinner(newBoard, winCondition);
    const nextPlayer = getNextPlayer(gameState.currentPlayer);
    
    let xWins = gameState.playerXWins;
    let oWins = gameState.playerOWins;
    let draws = gameState.draws;
    
    if (winner === 'X') xWins++;
    if (winner === 'O') oWins++;
    if (winner === 'DRAW') draws++;

    setGameState({
      board: newBoard,
      currentPlayer: nextPlayer,
      winner,
      gameOver: winner !== null,
      history: newHistory,
      playerXWins: xWins,
      playerOWins: oWins,
      draws: draws,
      undoUsed: gameState.undoUsed,
      winningLine,
      playerNames: gameState.playerNames
    });
  }, [gameState, boardSize, winCondition]);

  const undoMove = useCallback(() => {
    if (gameState.history.length === 0 || gameState.undoUsed) {
      return;
    }

    const lastHistoryItem = gameState.history[gameState.history.length - 1];
    const newHistory = gameState.history.slice(0, -1);

    setGameState({
      ...gameState,
      board: lastHistoryItem.boardState,
      currentPlayer: lastHistoryItem.currentPlayer,
      history: newHistory,
      winner: null,
      gameOver: false,
      undoUsed: true,
      winningLine: null
    });
  }, [gameState]);

  const resetGame = useCallback((newSize?: number) => {
    const size = newSize !== undefined ? newSize : boardSize;
    setBoardSize(size);
    
    setGameState({
      board: createBoard(size),
      currentPlayer: 'X',
      winner: null,
      gameOver: false,
      history: [],
      playerXWins: gameState.playerXWins,
      playerOWins: gameState.playerOWins,
      draws: gameState.draws,
      undoUsed: false,
      winningLine: null,
      playerNames: gameState.playerNames
    });
  }, [boardSize, gameState.playerXWins, gameState.playerOWins, gameState.draws, gameState.playerNames]);

  const resetStats = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      playerXWins: 0,
      playerOWins: 0,
      draws: 0
    }));
  }, []);

  const updatePlayerName = useCallback((player: Player, name: string) => {
    setGameState(prevState => ({
      ...prevState,
      playerNames: {
        ...prevState.playerNames,
        [player]: name || DEFAULT_NAMES[player]
      }
    }));
  }, []);

  return {
    gameState,
    boardSize,
    winCondition,
    makeMove,
    undoMove,
    resetGame,
    resetStats,
    updatePlayerName
  };
};