export interface TierData {
  id: number;
  maxWave: number;
  isExpanded: boolean;
}

export interface AdvancedSettings {
  gameSpeed: number;
  perkBonus: number;
  labLevel: number;
  critMultiplier: number;
  isExpanded: boolean;
}

export interface GameTierResult {
  tierId: number;
  gameTime: number;
  coinsPerHour: number;
  cellsPerHour: number;
  rerollShardsPerHour: number;
  details: string;
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;