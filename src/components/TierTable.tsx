import React from 'react';
import TierRow from './TierRow';
import { useGameData } from '../context/GameDataContext';

const TierTable: React.FC = () => {
  const { tierData, tierResults } = useGameData();

  // Combine tier data with results for rendering
  const combinedData = tierData.map(tier => {
    const result = tierResults.find(r => r.tierId === tier.id) || {
      tierId: tier.id,
      gameTime: 0,
      coinsPerHour: 0,
      cellsPerHour: 0,
      rerollShardsPerHour: 0,
      details: ''
    };
    
    return {
      ...tier,
      ...result
    };
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-750 text-gray-300 text-left">
            <th className="p-3 border-b border-gray-700 w-24">Tier</th>
            <th className="p-3 border-b border-gray-700 w-36">Max Wave</th>
            <th className="p-3 border-b border-gray-700">Game Time</th>
            <th className="p-3 border-b border-gray-700">Coins/Hour</th>
            <th className="p-3 border-b border-gray-700">Cells/Hour</th>
            <th className="p-3 border-b border-gray-700">Reroll Shards/Hour</th>
            <th className="p-3 border-b border-gray-700 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map(tierInfo => (
            <TierRow 
              key={tierInfo.id}
              tier={tierInfo.id}
              maxWave={tierInfo.maxWave}
              gameTime={tierInfo.gameTime}
              coinsPerHour={tierInfo.coinsPerHour}
              cellsPerHour={tierInfo.cellsPerHour}
              rerollShardsPerHour={tierInfo.rerollShardsPerHour}
              details={tierInfo.details}
              isExpanded={tierInfo.isExpanded}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TierTable;