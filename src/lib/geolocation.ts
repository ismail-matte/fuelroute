// Geolocation and Regional Settings

export interface RegionalSettings {
  currency: string;
  region: string;
  distanceUnit: 'km' | 'miles';
  fuelPriceEstimate: number;
}

export const regionMapping: Record<string, RegionalSettings> = {
  // North America
  'US': { currency: 'USD', region: 'americas', distanceUnit: 'miles', fuelPriceEstimate: 0.90 },
  'CA': { currency: 'CAD', region: 'americas', distanceUnit: 'km', fuelPriceEstimate: 1.60 },
  'MX': { currency: 'USD', region: 'americas', distanceUnit: 'km', fuelPriceEstimate: 1.20 },
  
  // Europe
  'GB': { currency: 'GBP', region: 'europe', distanceUnit: 'miles', fuelPriceEstimate: 1.65 },
  'DE': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.85 },
  'FR': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.90 },
  'IT': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.95 },
  'ES': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.70 },
  'NL': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 2.10 },
  'BE': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.80 },
  'PL': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.50 },
  'SE': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.95 },
  'NO': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 2.20 },
  'CH': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.75 },
  'AT': { currency: 'EUR', region: 'europe', distanceUnit: 'km', fuelPriceEstimate: 1.60 },
  
  // Africa
  'ZA': { currency: 'ZAR', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 22.00 },
  'NG': { currency: 'NGN', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 650.00 },
  'KE': { currency: 'KES', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 180.00 },
  'EG': { currency: 'USD', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 0.35 },
  'MA': { currency: 'EUR', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 1.20 },
  'TN': { currency: 'EUR', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 0.80 },
  'GH': { currency: 'USD', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 1.40 },
  'TZ': { currency: 'USD', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 1.30 },
  'UG': { currency: 'UGX', region: 'africa', distanceUnit: 'km', fuelPriceEstimate: 5200.00 },
  
  // Asia
  'CN': { currency: 'CNY', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 7.50 },
  'JP': { currency: 'JPY', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 165.00 },
  'IN': { currency: 'INR', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 105.00 },
  'KR': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 1.50 },
  'TH': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 1.20 },
  'MY': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 0.55 },
  'SG': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 2.20 },
  'ID': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 0.90 },
  'PH': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 1.10 },
  'VN': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 1.00 },
  'PK': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 1.10 },
  'BD': { currency: 'USD', region: 'asia', distanceUnit: 'km', fuelPriceEstimate: 1.15 },
  
  // Middle East
  'AE': { currency: 'USD', region: 'middle-east', distanceUnit: 'km', fuelPriceEstimate: 0.60 },
  'SA': { currency: 'USD', region: 'middle-east', distanceUnit: 'km', fuelPriceEstimate: 0.50 },
  'QA': { currency: 'USD', region: 'middle-east', distanceUnit: 'km', fuelPriceEstimate: 0.45 },
  'KW': { currency: 'USD', region: 'middle-east', distanceUnit: 'km', fuelPriceEstimate: 0.35 },
  'OM': { currency: 'USD', region: 'middle-east', distanceUnit: 'km', fuelPriceEstimate: 0.50 },
  'BH': { currency: 'USD', region: 'middle-east', distanceUnit: 'km', fuelPriceEstimate: 0.40 },
  'IL': { currency: 'USD', region: 'middle-east', distanceUnit: 'km', fuelPriceEstimate: 1.90 },
  
  // Oceania
  'AU': { currency: 'AUD', region: 'oceania', distanceUnit: 'km', fuelPriceEstimate: 1.80 },
  'NZ': { currency: 'AUD', region: 'oceania', distanceUnit: 'km', fuelPriceEstimate: 2.40 },
  
  // South America
  'BR': { currency: 'USD', region: 'americas', distanceUnit: 'km', fuelPriceEstimate: 1.20 },
  'AR': { currency: 'USD', region: 'americas', distanceUnit: 'km', fuelPriceEstimate: 0.90 },
  'CL': { currency: 'USD', region: 'americas', distanceUnit: 'km', fuelPriceEstimate: 1.30 },
  'CO': { currency: 'USD', region: 'americas', distanceUnit: 'km', fuelPriceEstimate: 0.85 },
  'PE': { currency: 'USD', region: 'americas', distanceUnit: 'km', fuelPriceEstimate: 1.25 },
};

export async function detectUserLocation(): Promise<RegionalSettings> {
  try {
    // Try to get user's country from IP geolocation API (free service)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    const countryCode = data.country_code;
    
    if (countryCode && regionMapping[countryCode]) {
      return regionMapping[countryCode];
    }
  } catch (error) {
    console.log('Could not detect location, using defaults');
  }
  
  // Default to US settings
  return {
    currency: 'USD',
    region: 'global',
    distanceUnit: 'km',
    fuelPriceEstimate: 1.50
  };
}

export function getRegionFromCountry(countryCode: string): string {
  return regionMapping[countryCode]?.region || 'global';
}

export function getCurrencyFromCountry(countryCode: string): string {
  return regionMapping[countryCode]?.currency || 'USD';
}
