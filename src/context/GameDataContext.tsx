import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TierData, AdvancedSettings, GameTierResult } from '../types';
import { calculateTierResults } from '../utils/calculations';

interface GameDataContextType {
  tierData: TierData[];
  advancedSettings: AdvancedSettings;
  updateTierWave: (tierId: number, maxWave: number) => void;
  updateAdvancedSettings: (settings: Partial<AdvancedSettings>) => void;
  toggleRowExpanded: (tierId: number) => void;
  tierResults: GameTierResult[];
}

const defaultAdvancedSettings: AdvancedSettings = {
  gameSpeed: 1.0,
  perkBonus: 0,
  labLevel: 0,
  isExpanded: false
};

const initialTierData: TierData[] = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  maxWave: 0,
  isExpanded: false
}));

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export const GameDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tierData, setTierData] = useState<TierData[]>(initialTierData);
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>(defaultAdvancedSettings);
  const [tierResults, setTierResults] = useState<GameTierResult[]>([]);

  useEffect(() => {
    // Calculate results whenever tier data or advanced settings change
    const results = calculateTierResults(tierData, advancedSettings);
    setTierResults(results);
  }, [tierData, advancedSettings]);

  const updateTierWave = (tierId: number, maxWave: number) => {
    setTierData(prev => 
      prev.map(tier => 
        tier.id === tierId ? { ...tier, maxWave } : tier
      )
    );
  };

  const updateAdvancedSettings = (settings: Partial<AdvancedSettings>) => {
    setAdvancedSettings(prev => ({ ...prev, ...settings }));
  };

  const toggleRowExpanded = (tierId: number) => {
    setTierData(prev => 
      prev.map(tier => 
        tier.id === tierId ? { ...tier, isExpanded: !tier.isExpanded } : tier
      )
    );
  };

  return (
    <GameDataContext.Provider value={{
      tierData,
      advancedSettings,
      updateTierWave,
      updateAdvancedSettings,
      toggleRowExpanded,
      tierResults
    }}>
      {children}
    </GameDataContext.Provider>
  );
};

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};