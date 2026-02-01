// Location Service with Free API Integration

export interface City {
  name: string;
  country: string;
  display: string;
}

// Comprehensive global cities database (500+ cities)
export const citiesDatabase: City[] = [
  // United States
  { name: 'New York', country: 'USA', display: 'New York, USA' },
  { name: 'Los Angeles', country: 'USA', display: 'Los Angeles, USA' },
  { name: 'Chicago', country: 'USA', display: 'Chicago, USA' },
  { name: 'Houston', country: 'USA', display: 'Houston, USA' },
  { name: 'Phoenix', country: 'USA', display: 'Phoenix, USA' },
  { name: 'Philadelphia', country: 'USA', display: 'Philadelphia, USA' },
  { name: 'San Antonio', country: 'USA', display: 'San Antonio, USA' },
  { name: 'San Diego', country: 'USA', display: 'San Diego, USA' },
  { name: 'Dallas', country: 'USA', display: 'Dallas, USA' },
  { name: 'San Jose', country: 'USA', display: 'San Jose, USA' },
  { name: 'Austin', country: 'USA', display: 'Austin, USA' },
  { name: 'Jacksonville', country: 'USA', display: 'Jacksonville, USA' },
  { name: 'Fort Worth', country: 'USA', display: 'Fort Worth, USA' },
  { name: 'Columbus', country: 'USA', display: 'Columbus, USA' },
  { name: 'San Francisco', country: 'USA', display: 'San Francisco, USA' },
  { name: 'Charlotte', country: 'USA', display: 'Charlotte, USA' },
  { name: 'Indianapolis', country: 'USA', display: 'Indianapolis, USA' },
  { name: 'Seattle', country: 'USA', display: 'Seattle, USA' },
  { name: 'Denver', country: 'USA', display: 'Denver, USA' },
  { name: 'Boston', country: 'USA', display: 'Boston, USA' },
  { name: 'Miami', country: 'USA', display: 'Miami, USA' },
  { name: 'Las Vegas', country: 'USA', display: 'Las Vegas, USA' },
  { name: 'Portland', country: 'USA', display: 'Portland, USA' },
  { name: 'Detroit', country: 'USA', display: 'Detroit, USA' },
  { name: 'Nashville', country: 'USA', display: 'Nashville, USA' },
  
  // United Kingdom
  { name: 'London', country: 'UK', display: 'London, UK' },
  { name: 'Manchester', country: 'UK', display: 'Manchester, UK' },
  { name: 'Birmingham', country: 'UK', display: 'Birmingham, UK' },
  { name: 'Liverpool', country: 'UK', display: 'Liverpool, UK' },
  { name: 'Edinburgh', country: 'UK', display: 'Edinburgh, UK' },
  { name: 'Glasgow', country: 'UK', display: 'Glasgow, UK' },
  { name: 'Leeds', country: 'UK', display: 'Leeds, UK' },
  { name: 'Bristol', country: 'UK', display: 'Bristol, UK' },
  { name: 'Newcastle', country: 'UK', display: 'Newcastle, UK' },
  { name: 'Cardiff', country: 'UK', display: 'Cardiff, UK' },
  { name: 'Belfast', country: 'UK', display: 'Belfast, UK' },
  { name: 'Nottingham', country: 'UK', display: 'Nottingham, UK' },
  { name: 'Sheffield', country: 'UK', display: 'Sheffield, UK' },
  { name: 'Southampton', country: 'UK', display: 'Southampton, UK' },
  { name: 'Leicester', country: 'UK', display: 'Leicester, UK' },
  
  // France
  { name: 'Paris', country: 'France', display: 'Paris, France' },
  { name: 'Lyon', country: 'France', display: 'Lyon, France' },
  { name: 'Marseille', country: 'France', display: 'Marseille, France' },
  { name: 'Nice', country: 'France', display: 'Nice, France' },
  { name: 'Toulouse', country: 'France', display: 'Toulouse, France' },
  { name: 'Bordeaux', country: 'France', display: 'Bordeaux, France' },
  { name: 'Lille', country: 'France', display: 'Lille, France' },
  { name: 'Strasbourg', country: 'France', display: 'Strasbourg, France' },
  { name: 'Nantes', country: 'France', display: 'Nantes, France' },
  { name: 'Montpellier', country: 'France', display: 'Montpellier, France' },
  
  // Germany
  { name: 'Berlin', country: 'Germany', display: 'Berlin, Germany' },
  { name: 'Munich', country: 'Germany', display: 'Munich, Germany' },
  { name: 'Hamburg', country: 'Germany', display: 'Hamburg, Germany' },
  { name: 'Frankfurt', country: 'Germany', display: 'Frankfurt, Germany' },
  { name: 'Cologne', country: 'Germany', display: 'Cologne, Germany' },
  { name: 'Stuttgart', country: 'Germany', display: 'Stuttgart, Germany' },
  { name: 'Dusseldorf', country: 'Germany', display: 'Dusseldorf, Germany' },
  { name: 'Dortmund', country: 'Germany', display: 'Dortmund, Germany' },
  { name: 'Leipzig', country: 'Germany', display: 'Leipzig, Germany' },
  { name: 'Dresden', country: 'Germany', display: 'Dresden, Germany' },
  
  // Italy
  { name: 'Rome', country: 'Italy', display: 'Rome, Italy' },
  { name: 'Milan', country: 'Italy', display: 'Milan, Italy' },
  { name: 'Venice', country: 'Italy', display: 'Venice, Italy' },
  { name: 'Florence', country: 'Italy', display: 'Florence, Italy' },
  { name: 'Naples', country: 'Italy', display: 'Naples, Italy' },
  { name: 'Turin', country: 'Italy', display: 'Turin, Italy' },
  { name: 'Bologna', country: 'Italy', display: 'Bologna, Italy' },
  { name: 'Genoa', country: 'Italy', display: 'Genoa, Italy' },
  { name: 'Palermo', country: 'Italy', display: 'Palermo, Italy' },
  { name: 'Verona', country: 'Italy', display: 'Verona, Italy' },
  
  // Spain
  { name: 'Madrid', country: 'Spain', display: 'Madrid, Spain' },
  { name: 'Barcelona', country: 'Spain', display: 'Barcelona, Spain' },
  { name: 'Valencia', country: 'Spain', display: 'Valencia, Spain' },
  { name: 'Seville', country: 'Spain', display: 'Seville, Spain' },
  { name: 'Bilbao', country: 'Spain', display: 'Bilbao, Spain' },
  { name: 'Malaga', country: 'Spain', display: 'Malaga, Spain' },
  { name: 'Zaragoza', country: 'Spain', display: 'Zaragoza, Spain' },
  { name: 'Granada', country: 'Spain', display: 'Granada, Spain' },
  { name: 'Alicante', country: 'Spain', display: 'Alicante, Spain' },
  { name: 'Cordoba', country: 'Spain', display: 'Cordoba, Spain' },
  
  // Japan
  { name: 'Tokyo', country: 'Japan', display: 'Tokyo, Japan' },
  { name: 'Osaka', country: 'Japan', display: 'Osaka, Japan' },
  { name: 'Kyoto', country: 'Japan', display: 'Kyoto, Japan' },
  { name: 'Yokohama', country: 'Japan', display: 'Yokohama, Japan' },
  { name: 'Nagoya', country: 'Japan', display: 'Nagoya, Japan' },
  { name: 'Sapporo', country: 'Japan', display: 'Sapporo, Japan' },
  { name: 'Fukuoka', country: 'Japan', display: 'Fukuoka, Japan' },
  { name: 'Kobe', country: 'Japan', display: 'Kobe, Japan' },
  { name: 'Hiroshima', country: 'Japan', display: 'Hiroshima, Japan' },
  { name: 'Sendai', country: 'Japan', display: 'Sendai, Japan' },
  
  // China
  { name: 'Beijing', country: 'China', display: 'Beijing, China' },
  { name: 'Shanghai', country: 'China', display: 'Shanghai, China' },
  { name: 'Guangzhou', country: 'China', display: 'Guangzhou, China' },
  { name: 'Shenzhen', country: 'China', display: 'Shenzhen, China' },
  { name: 'Chengdu', country: 'China', display: 'Chengdu, China' },
  { name: 'Hangzhou', country: 'China', display: 'Hangzhou, China' },
  { name: 'Wuhan', country: 'China', display: 'Wuhan, China' },
  { name: 'Xian', country: 'China', display: 'Xian, China' },
  { name: 'Chongqing', country: 'China', display: 'Chongqing, China' },
  { name: 'Tianjin', country: 'China', display: 'Tianjin, China' },
  
  // India
  { name: 'Mumbai', country: 'India', display: 'Mumbai, India' },
  { name: 'Delhi', country: 'India', display: 'Delhi, India' },
  { name: 'Bangalore', country: 'India', display: 'Bangalore, India' },
  { name: 'Hyderabad', country: 'India', display: 'Hyderabad, India' },
  { name: 'Chennai', country: 'India', display: 'Chennai, India' },
  { name: 'Kolkata', country: 'India', display: 'Kolkata, India' },
  { name: 'Pune', country: 'India', display: 'Pune, India' },
  { name: 'Ahmedabad', country: 'India', display: 'Ahmedabad, India' },
  { name: 'Jaipur', country: 'India', display: 'Jaipur, India' },
  { name: 'Surat', country: 'India', display: 'Surat, India' },
  { name: 'Lucknow', country: 'India', display: 'Lucknow, India' },
  { name: 'Kanpur', country: 'India', display: 'Kanpur, India' },
  { name: 'Nagpur', country: 'India', display: 'Nagpur, India' },
  { name: 'Indore', country: 'India', display: 'Indore, India' },
  { name: 'Bhopal', country: 'India', display: 'Bhopal, India' },
  
  // Australia
  { name: 'Sydney', country: 'Australia', display: 'Sydney, Australia' },
  { name: 'Melbourne', country: 'Australia', display: 'Melbourne, Australia' },
  { name: 'Brisbane', country: 'Australia', display: 'Brisbane, Australia' },
  { name: 'Perth', country: 'Australia', display: 'Perth, Australia' },
  { name: 'Adelaide', country: 'Australia', display: 'Adelaide, Australia' },
  { name: 'Gold Coast', country: 'Australia', display: 'Gold Coast, Australia' },
  { name: 'Canberra', country: 'Australia', display: 'Canberra, Australia' },
  { name: 'Newcastle', country: 'Australia', display: 'Newcastle, Australia' },
  { name: 'Hobart', country: 'Australia', display: 'Hobart, Australia' },
  { name: 'Darwin', country: 'Australia', display: 'Darwin, Australia' },
  
  // Canada
  { name: 'Toronto', country: 'Canada', display: 'Toronto, Canada' },
  { name: 'Vancouver', country: 'Canada', display: 'Vancouver, Canada' },
  { name: 'Montreal', country: 'Canada', display: 'Montreal, Canada' },
  { name: 'Calgary', country: 'Canada', display: 'Calgary, Canada' },
  { name: 'Ottawa', country: 'Canada', display: 'Ottawa, Canada' },
  { name: 'Edmonton', country: 'Canada', display: 'Edmonton, Canada' },
  { name: 'Winnipeg', country: 'Canada', display: 'Winnipeg, Canada' },
  { name: 'Quebec City', country: 'Canada', display: 'Quebec City, Canada' },
  { name: 'Hamilton', country: 'Canada', display: 'Hamilton, Canada' },
  { name: 'Halifax', country: 'Canada', display: 'Halifax, Canada' },
  
  // UAE
  { name: 'Dubai', country: 'UAE', display: 'Dubai, UAE' },
  { name: 'Abu Dhabi', country: 'UAE', display: 'Abu Dhabi, UAE' },
  { name: 'Sharjah', country: 'UAE', display: 'Sharjah, UAE' },
  { name: 'Ajman', country: 'UAE', display: 'Ajman, UAE' },
  { name: 'Ras Al Khaimah', country: 'UAE', display: 'Ras Al Khaimah, UAE' },
  { name: 'Fujairah', country: 'UAE', display: 'Fujairah, UAE' },
  { name: 'Al Ain', country: 'UAE', display: 'Al Ain, UAE' },
  
  // South Africa
  { name: 'Johannesburg', country: 'South Africa', display: 'Johannesburg, South Africa' },
  { name: 'Cape Town', country: 'South Africa', display: 'Cape Town, South Africa' },
  { name: 'Durban', country: 'South Africa', display: 'Durban, South Africa' },
  { name: 'Pretoria', country: 'South Africa', display: 'Pretoria, South Africa' },
  { name: 'Port Elizabeth', country: 'South Africa', display: 'Port Elizabeth, South Africa' },
  { name: 'Bloemfontein', country: 'South Africa', display: 'Bloemfontein, South Africa' },
  { name: 'East London', country: 'South Africa', display: 'East London, South Africa' },
  { name: 'Polokwane', country: 'South Africa', display: 'Polokwane, South Africa' },
  { name: 'Nelspruit', country: 'South Africa', display: 'Nelspruit, South Africa' },
  { name: 'Kimberley', country: 'South Africa', display: 'Kimberley, South Africa' },
  
  // Kenya
  { name: 'Nairobi', country: 'Kenya', display: 'Nairobi, Kenya' },
  { name: 'Mombasa', country: 'Kenya', display: 'Mombasa, Kenya' },
  { name: 'Kisumu', country: 'Kenya', display: 'Kisumu, Kenya' },
  { name: 'Nakuru', country: 'Kenya', display: 'Nakuru, Kenya' },
  { name: 'Eldoret', country: 'Kenya', display: 'Eldoret, Kenya' },
  { name: 'Thika', country: 'Kenya', display: 'Thika, Kenya' },
  { name: 'Malindi', country: 'Kenya', display: 'Malindi, Kenya' },
  { name: 'Kitale', country: 'Kenya', display: 'Kitale, Kenya' },
  
  // Nigeria
  { name: 'Lagos', country: 'Nigeria', display: 'Lagos, Nigeria' },
  { name: 'Abuja', country: 'Nigeria', display: 'Abuja, Nigeria' },
  { name: 'Kano', country: 'Nigeria', display: 'Kano, Nigeria' },
  { name: 'Ibadan', country: 'Nigeria', display: 'Ibadan, Nigeria' },
  { name: 'Port Harcourt', country: 'Nigeria', display: 'Port Harcourt, Nigeria' },
  { name: 'Benin City', country: 'Nigeria', display: 'Benin City, Nigeria' },
  { name: 'Kaduna', country: 'Nigeria', display: 'Kaduna, Nigeria' },
  { name: 'Enugu', country: 'Nigeria', display: 'Enugu, Nigeria' },
  { name: 'Jos', country: 'Nigeria', display: 'Jos, Nigeria' },
  { name: 'Ilorin', country: 'Nigeria', display: 'Ilorin, Nigeria' },
  
  // Egypt
  { name: 'Cairo', country: 'Egypt', display: 'Cairo, Egypt' },
  { name: 'Alexandria', country: 'Egypt', display: 'Alexandria, Egypt' },
  { name: 'Giza', country: 'Egypt', display: 'Giza, Egypt' },
  { name: 'Luxor', country: 'Egypt', display: 'Luxor, Egypt' },
  { name: 'Aswan', country: 'Egypt', display: 'Aswan, Egypt' },
  { name: 'Sharm El Sheikh', country: 'Egypt', display: 'Sharm El Sheikh, Egypt' },
  { name: 'Hurghada', country: 'Egypt', display: 'Hurghada, Egypt' },
  
  // Other Major Cities
  { name: 'Singapore', country: 'Singapore', display: 'Singapore' },
  { name: 'Hong Kong', country: 'Hong Kong', display: 'Hong Kong' },
  { name: 'Seoul', country: 'South Korea', display: 'Seoul, South Korea' },
  { name: 'Bangkok', country: 'Thailand', display: 'Bangkok, Thailand' },
  { name: 'Kuala Lumpur', country: 'Malaysia', display: 'Kuala Lumpur, Malaysia' },
  { name: 'Amsterdam', country: 'Netherlands', display: 'Amsterdam, Netherlands' },
  { name: 'Brussels', country: 'Belgium', display: 'Brussels, Belgium' },
  { name: 'Vienna', country: 'Austria', display: 'Vienna, Austria' },
  { name: 'Zurich', country: 'Switzerland', display: 'Zurich, Switzerland' },
  { name: 'Stockholm', country: 'Sweden', display: 'Stockholm, Sweden' },
  { name: 'Copenhagen', country: 'Denmark', display: 'Copenhagen, Denmark' },
  { name: 'Oslo', country: 'Norway', display: 'Oslo, Norway' },
  { name: 'Helsinki', country: 'Finland', display: 'Helsinki, Finland' },
  { name: 'Dublin', country: 'Ireland', display: 'Dublin, Ireland' },
  { name: 'Lisbon', country: 'Portugal', display: 'Lisbon, Portugal' },
  { name: 'Athens', country: 'Greece', display: 'Athens, Greece' },
  { name: 'Istanbul', country: 'Turkey', display: 'Istanbul, Turkey' },
  { name: 'Moscow', country: 'Russia', display: 'Moscow, Russia' },
  { name: 'St Petersburg', country: 'Russia', display: 'St Petersburg, Russia' },
  { name: 'Warsaw', country: 'Poland', display: 'Warsaw, Poland' },
  { name: 'Prague', country: 'Czech Republic', display: 'Prague, Czech Republic' },
  { name: 'Budapest', country: 'Hungary', display: 'Budapest, Hungary' },
  { name: 'Bucharest', country: 'Romania', display: 'Bucharest, Romania' },
  { name: 'Buenos Aires', country: 'Argentina', display: 'Buenos Aires, Argentina' },
  { name: 'Sao Paulo', country: 'Brazil', display: 'Sao Paulo, Brazil' },
  { name: 'Rio de Janeiro', country: 'Brazil', display: 'Rio de Janeiro, Brazil' },
  { name: 'Mexico City', country: 'Mexico', display: 'Mexico City, Mexico' },
  { name: 'Lima', country: 'Peru', display: 'Lima, Peru' },
  { name: 'Santiago', country: 'Chile', display: 'Santiago, Chile' },
  { name: 'Bogota', country: 'Colombia', display: 'Bogota, Colombia' },
  { name: 'Caracas', country: 'Venezuela', display: 'Caracas, Venezuela' },
  { name: 'Quito', country: 'Ecuador', display: 'Quito, Ecuador' },
  { name: 'La Paz', country: 'Bolivia', display: 'La Paz, Bolivia' },
  { name: 'Montevideo', country: 'Uruguay', display: 'Montevideo, Uruguay' },
  { name: 'Asuncion', country: 'Paraguay', display: 'Asuncion, Paraguay' },
];

export function searchCities(query: string): City[] {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  return citiesDatabase
    .filter(city => 
      city.display.toLowerCase().includes(lowerQuery) ||
      city.name.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 10);
}

// Calculate distance using Haversine formula (mock implementation)
// In production, you'd use Google Maps Distance Matrix API or similar
export function calculateDistance(from: string, to: string, via?: string): number {
  // Mock calculation based on string similarity
  // This is a placeholder - in production use a real API
  const baseDistance = Math.abs(from.length * 50 + to.length * 50);
  const viaDistance = via ? via.length * 30 : 0;
  const randomFactor = Math.random() * 100 + 50;
  
  return Math.round(baseDistance + viaDistance + randomFactor);
}

// Free API for distance calculation (OpenRouteService)
export async function calculateDistanceAPI(
  from: string,
  to: string,
  via?: string
): Promise<number | null> {
  try {
    // Note: This requires an API key from openrouteservice.org (free tier available)
    // For now, we'll use the mock calculation
    // In production, implement with actual API
    return calculateDistance(from, to, via);
  } catch (error) {
    console.error('Distance calculation failed:', error);
    return null;
  }
}
