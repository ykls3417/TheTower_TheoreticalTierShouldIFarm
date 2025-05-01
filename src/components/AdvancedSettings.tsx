import React from 'react';
import { useGameData } from '../context/GameDataContext';
import { InputChangeEvent } from '../types';

const AdvancedSettings: React.FC = () => {
  const { advancedSettings, updateAdvancedSettings } = useGameData();

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    
    updateAdvancedSettings({
      [name]: parsedValue
    });
  };

  return (
    <div className="p-4 bg-gray-850 border-b border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="space-y-2">
          <label htmlFor="gameSpeed" className="block text-sm font-medium text-gray-300">
            Game Speed
          </label>
          <input
            id="gameSpeed"
            name="gameSpeed"
            type="number"
            min="1"
            max="6.25"
            step="0.01"
            value={advancedSettings.gameSpeed}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="perkBonus" className="block text-sm font-medium text-gray-300">
            Standard Perk Bonus (%)
          </label>
          <input
            id="perkBonus"
            name="perkBonus"
            type="number"
            min="0"
            max="25"
            step="1"
            value={advancedSettings.perkBonus}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="labLevel" className="block text-sm font-medium text-gray-300">
            Reroll Shard Lab Level
          </label>
          <input
            id="labLevel"
            name="labLevel"
            type="number"
            min="0"
            max="100"
            step="1"
            value={advancedSettings.labLevel}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-md">
        <p className="text-sm text-blue-300">
          <strong>Tip:</strong> These are not necessary, but good for to calculate a better result (especially for reroll shard).
        </p>
      </div>
    </div>
  );
};

export default AdvancedSettings;