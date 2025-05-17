import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import GameLayout from './components/GameLayout';
import Counter from './components/Counter'; // ✅ Import Counter component

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-md py-4 mb-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
              Tic Tac Toe
            </h1>
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-1">
              A modern take on the classic game
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 pb-8">
          {/*  Selenium Test Component */}
          <div className="mb-6 border border-indigo-300 dark:border-indigo-700 rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Selenium Test Component</h2>
            <Counter />
          </div>

          {/* Existing game layout */}
          <GameLayout />
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-800 py-4 mt-auto border-t border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
              © 2025 Tic Tac Toe Game
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
