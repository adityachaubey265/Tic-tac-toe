export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type GameBoard = CellValue[][];

export type GameHistory = {
  boardState: GameBoard;
  currentPlayer: Player;
};

export type WinningLine = {
  type: 'row' | 'column' | 'diagonal' | 'diagonal-reverse';
  index: number;
  start?: number;
} | null;

export type PlayerNames = {
  X: string;
  O: string;
};

export type GameState = {
  board: GameBoard;
  currentPlayer: Player;
  winner: Player | 'DRAW' | null;
  gameOver: boolean;
  history: GameHistory[];
  playerXWins: number;
  playerOWins: number;
  draws: number;
  undoUsed: boolean;
  winningLine: WinningLine;
  playerNames: PlayerNames;
};

export type ThemeMode = 'light' | 'dark';