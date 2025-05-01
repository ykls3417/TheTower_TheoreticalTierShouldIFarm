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
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">The Tower - What Theoretical Tier Should I Farm</h1>
            <p className="text-gray-400">Calculate optimal farming efficiency based on your max wave</p>
          </header>
          
          <GameCalculator />
          
          <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Developed By ykls3417.</p><p> Inspired by <a href="https://tower.spacewi.de/SpawncountCalc.html">Spawn Count Calculator - eike23</a> & <a href="https://what-tier-should-i-farm.netlify.app/">What Tier Should I Farm - Skye</a>.</p>
          </footer>
        </main>
      </GameDataProvider>
    </div>
  );
}

export default App;