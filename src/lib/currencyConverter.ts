// Currency Conversion Utilities

// Approximate exchange rates (relative to USD)
// In production, use a real-time API like exchangerate-api.com (free tier available)
export const exchangeRates: Record<string, number> = {
  'USD': 1.00,
  'EUR': 0.92,
  'GBP': 0.79,
  'ZAR': 18.50,
  'AUD': 1.52,
  'CAD': 1.36,
  'JPY': 149.50,
  'CNY': 7.24,
  'INR': 83.12,
  'NGN': 1580.00,
  'KES': 129.00,
  'UGX': 3720.00,
  'AED': 3.67,
  'SAR': 3.75,
  'ZMW': 27.00,
  'BWP': 13.50,
  'TZS': 2520.00,
  'GHS': 15.80,
  'EGP': 49.00,
  'MAD': 9.90,
  'TND': 3.10,
};

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first
  const amountInUSD = amount / exchangeRates[fromCurrency];
  
  // Convert from USD to target currency
  const convertedAmount = amountInUSD * exchangeRates[toCurrency];
  
  return convertedAmount;
}

export function convertFuelPrice(price: number, fromCurrency: string, toCurrency: string): number {
  return convertCurrency(price, fromCurrency, toCurrency);
}

// Detect currency from location string
export function detectCurrencyFromLocation(location: string): string | null {
  const lowerLocation = location.toLowerCase();
  
  const countryToCurrency: Record<string, string> = {
    'uganda': 'UGX',
    'kenya': 'KES',
    'tanzania': 'TZS',
    'nigeria': 'NGN',
    'ghana': 'GHS',
    'south africa': 'ZAR',
    'zambia': 'ZMW',
    'botswana': 'BWP',
    'egypt': 'EGP',
    'morocco': 'MAD',
    'tunisia': 'TND',
    'uae': 'AED',
    'dubai': 'AED',
    'abu dhabi': 'AED',
    'saudi': 'SAR',
    'riyadh': 'SAR',
    'jeddah': 'SAR',
    'usa': 'USD',
    'america': 'USD',
    'canada': 'CAD',
    'uk': 'GBP',
    'britain': 'GBP',
    'london': 'GBP',
    'france': 'EUR',
    'germany': 'EUR',
    'spain': 'EUR',
    'italy': 'EUR',
    'europe': 'EUR',
    'australia': 'AUD',
    'japan': 'JPY',
    'china': 'CNY',
    'india': 'INR',
  };
  
  for (const [country, currency] of Object.entries(countryToCurrency)) {
    if (lowerLocation.includes(country)) {
      return currency;
    }
  }
  
  return null;
}

// Get currency symbol
export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    'USD': '$', 'EUR': '€', 'GBP': '£', 'ZAR': 'R', 'AUD': 'A$',
    'CAD': 'C$', 'JPY': '¥', 'CNY': '¥', 'INR': '₹', 'NGN': '₦',
    'KES': 'KSh', 'UGX': 'USh', 'AED': 'د.إ', 'SAR': 'ر.س',
    'ZMW': 'ZK', 'BWP': 'P', 'TZS': 'TSh', 'GHS': '₵',
    'EGP': 'E£', 'MAD': 'د.م.', 'TND': 'د.ت'
  };
  
  return symbols[currency] || currency;
}
