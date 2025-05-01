import React from 'react';
import GameCalculator from './components/GameCalculator';
import { GameDataProvider } from './context/GameDataContext';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
      <GameDataProvider>
        <main className="w-full max-w-6xl">
          <header className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">Game Efficiency Calculator</h1>
            <p className="text-gray-400">Calculate optimal farming efficiency based on your max wave survival</p>
          </header>
          
          <GameCalculator />
          
          <footer className="mt-8 text-center text-gray-500 text-sm">
            <p>© 2025 Game Efficiency Calculator. All data is stored locally in your browser.</p>
          </footer>
        </main>
      </GameDataProvider>
    </div>
  );
}

export default App;