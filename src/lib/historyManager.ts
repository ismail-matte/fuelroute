// Calculation History Manager

export interface CalculationHistory {
  id: string;
  timestamp: number;
  vehicleType: string;
  carModel: string;
  locationFrom: string;
  locationTo: string;
  locationVia?: string;
  distance: number;
  distanceUnit: string;
  fuelAmount: number;
  cost: number;
  currency: string;
  currencySymbol: string;
  consumption: number;
  co2: number;
  rating: string;
  verdictText: string;
}

const STORAGE_KEY = 'fuelroute_history';
const MAX_HISTORY = 20;

export function saveCalculation(calculation: Omit<CalculationHistory, 'id' | 'timestamp'>): void {
  const history = getHistory();
  const newCalculation: CalculationHistory = {
    ...calculation,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  
  history.unshift(newCalculation);
  
  // Keep only last MAX_HISTORY items
  const trimmedHistory = history.slice(0, MAX_HISTORY);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
}

export function getHistory(): CalculationHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
}

export function deleteCalculation(id: string): void {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}
