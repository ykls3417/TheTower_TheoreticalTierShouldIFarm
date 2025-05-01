import React from 'react';
import AdvancedSettings from './AdvancedSettings';
import TierTable from './TierTable';
import { useGameData } from '../context/GameDataContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const GameCalculator: React.FC = () => {
  const { advancedSettings, updateAdvancedSettings } = useGameData();

  const toggleAdvancedSettings = () => {
    updateAdvancedSettings({ isExpanded: !advancedSettings.isExpanded });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-gray-750 border-b border-gray-700 flex justify-between items-center">
        <button
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          onClick={toggleAdvancedSettings}
        >
          {advancedSettings.isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span className="font-medium">Advanced Settings</span>
        </button>


      </div>

      <div
        className="expandable-section"
        style={{ maxHeight: advancedSettings.isExpanded ? '500px' : '0px' }}
      >
        <AdvancedSettings />
      </div>
      <div className="mt-4 p-3 mx-4 bg-gray-800 bg-opacity-80 border border-blue-800 rounded-md text-gray-300">
        <p>
          <strong className="text-blue-400">Tip:</strong> IMPORTANT! These data are theoretical and highly simplified. It is only accurate across comparison within different tier.
        </p>
      </div>
      <div className="p-4">
        <TierTable />
      </div>
    </div>
  );
};

export default GameCalculator;