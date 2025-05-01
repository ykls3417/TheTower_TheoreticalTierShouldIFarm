import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useGameData } from '../context/GameDataContext';
import { formatTime, formatNumber } from '../utils/formatters';

interface TierRowProps {
  tier: number;
  maxWave: number;
  gameTime: number;
  coinsPerHour: number;
  cellsPerHour: number;
  rerollShardsPerHour: number;
  details: string;
  isExpanded: boolean;
}

const TierRow: React.FC<TierRowProps> = ({
  tier,
  maxWave,
  gameTime,
  coinsPerHour,
  cellsPerHour,
  rerollShardsPerHour,
  details,
  isExpanded
}) => {
  const { updateTierWave, toggleRowExpanded } = useGameData();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    updateTierWave(tier, value);
  };
  
  const handleToggleExpand = () => {
    toggleRowExpanded(tier);
  };

  // Apply a background highlight for best farming tiers (placeholder logic)
  const isEfficient = 
    coinsPerHour > 0 && 
    (tier === 6 || tier === 8 || tier === 10 || tier === 15);
  
  return (
    <>
      <tr className={`transition-colors ${isEfficient ? 'bg-green-900 bg-opacity-20' : tier % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'}`}>
        <td className="p-3 border-b border-gray-700">
          <span className="font-semibold">Tier {tier}</span>
        </td>
        <td className="p-3 border-b border-gray-700">
          <input
            type="number"
            min="0"
            value={maxWave || ''}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter max wave"
          />
        </td>
        <td className="p-3 border-b border-gray-700">
          {gameTime > 0 ? formatTime(gameTime) : '-'}
        </td>
        <td className="p-3 border-b border-gray-700">
          {coinsPerHour > 0 ? formatNumber(coinsPerHour) : '-'}
        </td>
        <td className="p-3 border-b border-gray-700">
          {cellsPerHour > 0 ? formatNumber(cellsPerHour) : '-'}
        </td>
        <td className="p-3 border-b border-gray-700">
          {rerollShardsPerHour > 0 ? formatNumber(rerollShardsPerHour) : '-'}
        </td>
        <td className="p-3 border-b border-gray-700 text-center">
          <button
            onClick={handleToggleExpand}
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label={isExpanded ? "Collapse row" : "Expand row"}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan={7} className="p-0 border-b border-gray-700">
          <div className={`table-row-detail ${isExpanded ? 'expanded' : ''} px-4 py-3 bg-gray-750`}>
            {details || (
              <div className="text-sm text-gray-400">
                <p>Additional tier information will be displayed here. This could include:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>Enemy stats and special abilities at this tier</li>
                  <li>Recommended tower setups</li>
                  <li>Special wave information and strategies</li>
                  <li>Resource drop rates and special rewards</li>
                </ul>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default TierRow;