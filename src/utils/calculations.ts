import { TierData, AdvancedSettings, GameTierResult } from '../types';

// This is a placeholder calculation that would be replaced with actual game formulas
export function calculateTierResults(
  tierData: TierData[],
  settings: AdvancedSettings
): GameTierResult[] {
  const speedMultiplier = settings.gameSpeed;
  const perkMultiplier = 1 + (settings.perkBonus / 100);
  const labMultiplier = 1 + (settings.labLevel * 0.02);
  const critMultiplier = settings.critMultiplier;
  
  return tierData.map(tier => {
    // Skip calculation if no max wave is provided
    if (!tier.maxWave) {
      return {
        tierId: tier.id,
        gameTime: 0,
        coinsPerHour: 0,
        cellsPerHour: 0,
        rerollShardsPerHour: 0,
        details: ''
      };
    }
    
    // Example calculation - this would be replaced with actual game formulas
    // Game time in minutes based on max wave and tier
    const baseGameTime = Math.min(tier.maxWave * 0.5, 20) * (0.8 + (tier.id * 0.1));
    const gameTime = baseGameTime / speedMultiplier;
    
    // Base values scaled by tier and wave
    const baseCoins = tier.id * 100 + (tier.maxWave * tier.id * 5);
    const baseCells = tier.id * 2 + (tier.maxWave * 0.3);
    const baseShards = Math.max(0, tier.id - 3) * 0.5 + (tier.maxWave * 0.05);
    
    // Apply multipliers
    const coinsPerRun = baseCoins * perkMultiplier * labMultiplier * critMultiplier;
    const cellsPerRun = baseCells * perkMultiplier * labMultiplier;
    const shardsPerRun = baseShards * perkMultiplier;
    
    // Calculate per hour rates (60 minutes / gameTime = runs per hour)
    const runsPerHour = 60 / gameTime;
    const coinsPerHour = coinsPerRun * runsPerHour;
    const cellsPerHour = cellsPerRun * runsPerHour;
    const rerollShardsPerHour = shardsPerRun * runsPerHour;
    
    const details = `
      At Tier ${tier.id} with max wave ${tier.maxWave}, each run takes approximately ${gameTime.toFixed(1)} minutes.
      You can complete about ${runsPerHour.toFixed(1)} runs per hour.
      Each run yields approximately ${coinsPerRun.toFixed(0)} coins, ${cellsPerRun.toFixed(1)} cells, and ${shardsPerRun.toFixed(2)} reroll shards.
    `;
    
    return {
      tierId: tier.id,
      gameTime,
      coinsPerHour,
      cellsPerHour,
      rerollShardsPerHour,
      details
    };
  });
}