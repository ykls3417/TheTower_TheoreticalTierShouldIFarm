import React from 'react';
import AdvancedSettings from './AdvancedSettings';
import TierTable from './TierTable';
import { useGameData } from '../context/GameDataContext';
import { ChevronDown, ChevronUp, Save, Download } from 'lucide-react';

const GameCalculator: React.FC = () => {
  const { advancedSettings, updateAdvancedSettings } = useGameData();
  
  const toggleAdvancedSettings = () => {
    updateAdvancedSettings({ isExpanded: !advancedSettings.isExpanded });
  };

  const handleSaveData = () => {
    // Placeholder for save functionality
    alert('Save functionality would be implemented here');
  };

  const handleLoadData = () => {
    // Placeholder for load functionality
    alert('Load functionality would be implemented here');
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
        
        <div className="flex gap-3">
          <button 
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition-colors"
            onClick={handleSaveData}
          >
            <Save size={14} />
            <span>Save</span>
          </button>
          <button 
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
            onClick={handleLoadData}
          >
            <Download size={14} />
            <span>Load</span>
          </button>
        </div>
      </div>
      
      <div 
        className="expandable-section"
        style={{ maxHeight: advancedSettings.isExpanded ? '500px' : '0px' }}
      >
        <AdvancedSettings />
      </div>
      
      <div className="p-4">
        <TierTable />
      </div>
    </div>
  );
};

export default GameCalculator;