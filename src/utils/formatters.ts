// Format time in minutes to a readable format
export function formatTime(minutes: number): string {
  if (minutes < 1) {
    return `${Math.round(minutes * 60)}s`;
  }
  
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  
  return `${mins}m`;
}

// Format large numbers with K/M/B suffixes
export function formatNumber(num: number): string {
  if (num === 0) return '0';
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  
  // For small numbers with decimals, limit to 1 decimal place
  if (num % 1 !== 0) {
    return num.toFixed(1);
  }
  
  return num.toString();
}