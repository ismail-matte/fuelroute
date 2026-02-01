// Comprehensive Global Car Database
export interface CarModel {
  name: string;
  brand: string;
  type: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  consumption: number; // L/100km or kWh/100km
  engine: number; // Liters
  regions: string[]; // Markets where popular
}

export const carDatabase: CarModel[] = [
  // TOYOTA
  { name: 'Toyota Corolla', brand: 'Toyota', type: 'petrol', consumption: 6.5, engine: 1.8, regions: ['global'] },
  { name: 'Toyota Camry', brand: 'Toyota', type: 'petrol', consumption: 7.8, engine: 2.5, regions: ['global'] },
  { name: 'Toyota Prius', brand: 'Toyota', type: 'hybrid', consumption: 4.3, engine: 1.8, regions: ['global'] },
  { name: 'Toyota RAV4', brand: 'Toyota', type: 'petrol', consumption: 8.1, engine: 2.5, regions: ['global'] },
  { name: 'Toyota Hilux', brand: 'Toyota', type: 'diesel', consumption: 8.5, engine: 2.8, regions: ['africa', 'asia', 'oceania'] },
  { name: 'Toyota Land Cruiser', brand: 'Toyota', type: 'diesel', consumption: 11.5, engine: 4.5, regions: ['global'] },
  { name: 'Toyota Yaris', brand: 'Toyota', type: 'petrol', consumption: 5.2, engine: 1.5, regions: ['global'] },
  { name: 'Toyota Fortuner', brand: 'Toyota', type: 'diesel', consumption: 9.2, engine: 2.8, regions: ['africa', 'asia'] },
  { name: 'Toyota Avanza', brand: 'Toyota', type: 'petrol', consumption: 6.8, engine: 1.5, regions: ['asia', 'africa'] },
  
  // HONDA
  { name: 'Honda Civic', brand: 'Honda', type: 'petrol', consumption: 6.7, engine: 1.5, regions: ['global'] },
  { name: 'Honda Accord', brand: 'Honda', type: 'petrol', consumption: 7.5, engine: 2.0, regions: ['global'] },
  { name: 'Honda CR-V', brand: 'Honda', type: 'petrol', consumption: 7.9, engine: 1.5, regions: ['global'] },
  { name: 'Honda Fit/Jazz', brand: 'Honda', type: 'petrol', consumption: 5.5, engine: 1.5, regions: ['global'] },
  { name: 'Honda HR-V', brand: 'Honda', type: 'petrol', consumption: 6.9, engine: 1.8, regions: ['global'] },
  
  // FORD
  { name: 'Ford Focus', brand: 'Ford', type: 'petrol', consumption: 6.9, engine: 1.6, regions: ['global'] },
  { name: 'Ford Mustang', brand: 'Ford', type: 'petrol', consumption: 11.2, engine: 5.0, regions: ['americas', 'europe'] },
  { name: 'Ford Ranger', brand: 'Ford', type: 'diesel', consumption: 8.9, engine: 2.0, regions: ['global'] },
  { name: 'Ford Fiesta', brand: 'Ford', type: 'petrol', consumption: 5.8, engine: 1.0, regions: ['global'] },
  { name: 'Ford EcoSport', brand: 'Ford', type: 'petrol', consumption: 7.2, engine: 1.5, regions: ['global'] },
  { name: 'Ford F-150', brand: 'Ford', type: 'petrol', consumption: 12.4, engine: 3.5, regions: ['americas'] },
  
  // VOLKSWAGEN
  { name: 'Volkswagen Golf', brand: 'Volkswagen', type: 'petrol', consumption: 6.4, engine: 1.4, regions: ['global'] },
  { name: 'Volkswagen Passat', brand: 'Volkswagen', type: 'diesel', consumption: 5.8, engine: 2.0, regions: ['global'] },
  { name: 'Volkswagen Polo', brand: 'Volkswagen', type: 'petrol', consumption: 5.6, engine: 1.0, regions: ['global'] },
  { name: 'Volkswagen Tiguan', brand: 'Volkswagen', type: 'petrol', consumption: 7.8, engine: 2.0, regions: ['global'] },
  { name: 'Volkswagen Jetta', brand: 'Volkswagen', type: 'petrol', consumption: 6.8, engine: 1.4, regions: ['global'] },
  { name: 'Volkswagen Amarok', brand: 'Volkswagen', type: 'diesel', consumption: 9.1, engine: 2.0, regions: ['africa', 'americas', 'oceania'] },
  
  // BMW
  { name: 'BMW 3 Series', brand: 'BMW', type: 'petrol', consumption: 7.2, engine: 2.0, regions: ['global'] },
  { name: 'BMW 5 Series', brand: 'BMW', type: 'diesel', consumption: 6.5, engine: 2.0, regions: ['global'] },
  { name: 'BMW X3', brand: 'BMW', type: 'petrol', consumption: 8.3, engine: 2.0, regions: ['global'] },
  { name: 'BMW X5', brand: 'BMW', type: 'diesel', consumption: 7.9, engine: 3.0, regions: ['global'] },
  { name: 'BMW 1 Series', brand: 'BMW', type: 'petrol', consumption: 6.5, engine: 1.5, regions: ['global'] },
  
  // MERCEDES-BENZ
  { name: 'Mercedes-Benz C-Class', brand: 'Mercedes-Benz', type: 'petrol', consumption: 7.4, engine: 2.0, regions: ['global'] },
  { name: 'Mercedes-Benz E-Class', brand: 'Mercedes-Benz', type: 'diesel', consumption: 6.2, engine: 2.0, regions: ['global'] },
  { name: 'Mercedes-Benz A-Class', brand: 'Mercedes-Benz', type: 'petrol', consumption: 6.8, engine: 1.3, regions: ['global'] },
  { name: 'Mercedes-Benz GLC', brand: 'Mercedes-Benz', type: 'diesel', consumption: 7.5, engine: 2.0, regions: ['global'] },
  { name: 'Mercedes-Benz Sprinter', brand: 'Mercedes-Benz', type: 'diesel', consumption: 10.5, engine: 2.1, regions: ['global'] },
  
  // AUDI
  { name: 'Audi A3', brand: 'Audi', type: 'petrol', consumption: 6.2, engine: 1.4, regions: ['global'] },
  { name: 'Audi A4', brand: 'Audi', type: 'petrol', consumption: 7.0, engine: 2.0, regions: ['global'] },
  { name: 'Audi A6', brand: 'Audi', type: 'diesel', consumption: 6.3, engine: 2.0, regions: ['global'] },
  { name: 'Audi Q5', brand: 'Audi', type: 'petrol', consumption: 8.1, engine: 2.0, regions: ['global'] },
  { name: 'Audi Q7', brand: 'Audi', type: 'diesel', consumption: 7.8, engine: 3.0, regions: ['global'] },
  
  // TESLA
  { name: 'Tesla Model 3', brand: 'Tesla', type: 'electric', consumption: 15.0, engine: 0, regions: ['global'] },
  { name: 'Tesla Model S', brand: 'Tesla', type: 'electric', consumption: 18.0, engine: 0, regions: ['global'] },
  { name: 'Tesla Model X', brand: 'Tesla', type: 'electric', consumption: 20.0, engine: 0, regions: ['global'] },
  { name: 'Tesla Model Y', brand: 'Tesla', type: 'electric', consumption: 16.5, engine: 0, regions: ['global'] },
  
  // NISSAN
  { name: 'Nissan Leaf', brand: 'Nissan', type: 'electric', consumption: 17.0, engine: 0, regions: ['global'] },
  { name: 'Nissan Altima', brand: 'Nissan', type: 'petrol', consumption: 7.6, engine: 2.5, regions: ['americas', 'asia'] },
  { name: 'Nissan Sentra', brand: 'Nissan', type: 'petrol', consumption: 6.7, engine: 1.8, regions: ['global'] },
  { name: 'Nissan X-Trail', brand: 'Nissan', type: 'petrol', consumption: 8.2, engine: 2.5, regions: ['global'] },
  { name: 'Nissan Patrol', brand: 'Nissan', type: 'petrol', consumption: 14.5, engine: 5.6, regions: ['middle-east', 'africa', 'oceania'] },
  { name: 'Nissan Navara', brand: 'Nissan', type: 'diesel', consumption: 8.7, engine: 2.3, regions: ['global'] },
  
  // HYUNDAI
  { name: 'Hyundai Elantra', brand: 'Hyundai', type: 'petrol', consumption: 6.5, engine: 2.0, regions: ['global'] },
  { name: 'Hyundai Tucson', brand: 'Hyundai', type: 'petrol', consumption: 7.8, engine: 2.0, regions: ['global'] },
  { name: 'Hyundai Ioniq', brand: 'Hyundai', type: 'electric', consumption: 14.5, engine: 0, regions: ['global'] },
  { name: 'Hyundai Kona', brand: 'Hyundai', type: 'petrol', consumption: 6.9, engine: 1.6, regions: ['global'] },
  { name: 'Hyundai Santa Fe', brand: 'Hyundai', type: 'diesel', consumption: 7.5, engine: 2.2, regions: ['global'] },
  { name: 'Hyundai i10', brand: 'Hyundai', type: 'petrol', consumption: 4.8, engine: 1.0, regions: ['global'] },
  { name: 'Hyundai i20', brand: 'Hyundai', type: 'petrol', consumption: 5.4, engine: 1.2, regions: ['global'] },
  
  // KIA
  { name: 'Kia Sportage', brand: 'Kia', type: 'petrol', consumption: 7.9, engine: 2.0, regions: ['global'] },
  { name: 'Kia Sorento', brand: 'Kia', type: 'diesel', consumption: 7.2, engine: 2.2, regions: ['global'] },
  { name: 'Kia Niro EV', brand: 'Kia', type: 'electric', consumption: 15.5, engine: 0, regions: ['global'] },
  { name: 'Kia Picanto', brand: 'Kia', type: 'petrol', consumption: 4.9, engine: 1.0, regions: ['global'] },
  { name: 'Kia Rio', brand: 'Kia', type: 'petrol', consumption: 5.8, engine: 1.4, regions: ['global'] },
  { name: 'Kia Seltos', brand: 'Kia', type: 'petrol', consumption: 7.1, engine: 1.5, regions: ['global'] },
  
  // MAZDA
  { name: 'Mazda 3', brand: 'Mazda', type: 'petrol', consumption: 6.6, engine: 2.0, regions: ['global'] },
  { name: 'Mazda CX-5', brand: 'Mazda', type: 'petrol', consumption: 8.2, engine: 2.5, regions: ['global'] },
  { name: 'Mazda 6', brand: 'Mazda', type: 'petrol', consumption: 7.4, engine: 2.5, regions: ['global'] },
  { name: 'Mazda CX-3', brand: 'Mazda', type: 'petrol', consumption: 6.4, engine: 2.0, regions: ['global'] },
  { name: 'Mazda 2', brand: 'Mazda', type: 'petrol', consumption: 5.3, engine: 1.5, regions: ['global'] },
  
  // CHEVROLET
  { name: 'Chevrolet Bolt', brand: 'Chevrolet', type: 'electric', consumption: 16.0, engine: 0, regions: ['americas'] },
  { name: 'Chevrolet Silverado', brand: 'Chevrolet', type: 'petrol', consumption: 13.1, engine: 5.3, regions: ['americas'] },
  { name: 'Chevrolet Malibu', brand: 'Chevrolet', type: 'petrol', consumption: 7.8, engine: 1.5, regions: ['americas'] },
  { name: 'Chevrolet Equinox', brand: 'Chevrolet', type: 'petrol', consumption: 8.4, engine: 1.5, regions: ['americas'] },
  { name: 'Chevrolet Spark', brand: 'Chevrolet', type: 'petrol', consumption: 5.6, engine: 1.4, regions: ['global'] },
  
  // SUBARU
  { name: 'Subaru Outback', brand: 'Subaru', type: 'petrol', consumption: 8.7, engine: 2.5, regions: ['americas', 'oceania'] },
  { name: 'Subaru Forester', brand: 'Subaru', type: 'petrol', consumption: 8.4, engine: 2.5, regions: ['global'] },
  { name: 'Subaru Impreza', brand: 'Subaru', type: 'petrol', consumption: 7.2, engine: 2.0, regions: ['global'] },
  { name: 'Subaru XV', brand: 'Subaru', type: 'petrol', consumption: 7.5, engine: 2.0, regions: ['global'] },
  
  // JEEP
  { name: 'Jeep Wrangler', brand: 'Jeep', type: 'petrol', consumption: 10.5, engine: 3.6, regions: ['americas', 'middle-east'] },
  { name: 'Jeep Grand Cherokee', brand: 'Jeep', type: 'petrol', consumption: 11.0, engine: 3.6, regions: ['americas', 'middle-east'] },
  { name: 'Jeep Compass', brand: 'Jeep', type: 'petrol', consumption: 8.1, engine: 2.4, regions: ['global'] },
  { name: 'Jeep Renegade', brand: 'Jeep', type: 'petrol', consumption: 7.3, engine: 1.4, regions: ['global'] },
  
  // LAND ROVER / RANGE ROVER
  { name: 'Range Rover Sport', brand: 'Land Rover', type: 'diesel', consumption: 9.5, engine: 3.0, regions: ['global'] },
  { name: 'Range Rover Evoque', brand: 'Land Rover', type: 'petrol', consumption: 8.2, engine: 2.0, regions: ['global'] },
  { name: 'Land Rover Defender', brand: 'Land Rover', type: 'diesel', consumption: 10.2, engine: 3.0, regions: ['global'] },
  { name: 'Land Rover Discovery', brand: 'Land Rover', type: 'diesel', consumption: 9.8, engine: 3.0, regions: ['global'] },
  
  // PORSCHE
  { name: 'Porsche 911', brand: 'Porsche', type: 'petrol', consumption: 10.8, engine: 3.0, regions: ['global'] },
  { name: 'Porsche Cayenne', brand: 'Porsche', type: 'petrol', consumption: 11.2, engine: 3.0, regions: ['global'] },
  { name: 'Porsche Macan', brand: 'Porsche', type: 'petrol', consumption: 9.2, engine: 2.0, regions: ['global'] },
  { name: 'Porsche Taycan', brand: 'Porsche', type: 'electric', consumption: 22.0, engine: 0, regions: ['global'] },
  
  // LEXUS
  { name: 'Lexus ES', brand: 'Lexus', type: 'hybrid', consumption: 5.8, engine: 2.5, regions: ['global'] },
  { name: 'Lexus RX', brand: 'Lexus', type: 'hybrid', consumption: 7.2, engine: 3.5, regions: ['global'] },
  { name: 'Lexus NX', brand: 'Lexus', type: 'hybrid', consumption: 6.5, engine: 2.5, regions: ['global'] },
  { name: 'Lexus IS', brand: 'Lexus', type: 'petrol', consumption: 8.1, engine: 2.0, regions: ['global'] },
  
  // MITSUBISHI
  { name: 'Mitsubishi Outlander', brand: 'Mitsubishi', type: 'petrol', consumption: 8.5, engine: 2.4, regions: ['global'] },
  { name: 'Mitsubishi Pajero', brand: 'Mitsubishi', type: 'diesel', consumption: 10.8, engine: 3.2, regions: ['africa', 'asia', 'middle-east'] },
  { name: 'Mitsubishi Triton', brand: 'Mitsubishi', type: 'diesel', consumption: 8.6, engine: 2.4, regions: ['asia', 'oceania', 'africa'] },
  { name: 'Mitsubishi Mirage', brand: 'Mitsubishi', type: 'petrol', consumption: 5.1, engine: 1.2, regions: ['global'] },
  
  // PEUGEOT
  { name: 'Peugeot 208', brand: 'Peugeot', type: 'petrol', consumption: 5.4, engine: 1.2, regions: ['europe', 'africa'] },
  { name: 'Peugeot 308', brand: 'Peugeot', type: 'diesel', consumption: 4.8, engine: 1.5, regions: ['europe', 'africa'] },
  { name: 'Peugeot 3008', brand: 'Peugeot', type: 'diesel', consumption: 5.9, engine: 1.5, regions: ['europe', 'africa'] },
  { name: 'Peugeot 508', brand: 'Peugeot', type: 'diesel', consumption: 5.5, engine: 2.0, regions: ['europe', 'africa'] },
  
  // RENAULT
  { name: 'Renault Clio', brand: 'Renault', type: 'petrol', consumption: 5.6, engine: 1.0, regions: ['europe', 'africa'] },
  { name: 'Renault Megane', brand: 'Renault', type: 'diesel', consumption: 4.9, engine: 1.5, regions: ['europe', 'africa'] },
  { name: 'Renault Captur', brand: 'Renault', type: 'petrol', consumption: 6.2, engine: 1.3, regions: ['europe', 'africa'] },
  { name: 'Renault Duster', brand: 'Renault', type: 'petrol', consumption: 7.8, engine: 1.6, regions: ['global'] },
  
  // FIAT
  { name: 'Fiat 500', brand: 'Fiat', type: 'petrol', consumption: 4.9, engine: 1.2, regions: ['europe', 'americas'] },
  { name: 'Fiat Panda', brand: 'Fiat', type: 'petrol', consumption: 4.7, engine: 1.0, regions: ['europe'] },
  { name: 'Fiat Tipo', brand: 'Fiat', type: 'diesel', consumption: 4.6, engine: 1.3, regions: ['europe', 'africa'] },
  
  // SKODA
  { name: 'Skoda Octavia', brand: 'Skoda', type: 'petrol', consumption: 6.4, engine: 1.4, regions: ['europe', 'asia'] },
  { name: 'Skoda Superb', brand: 'Skoda', type: 'diesel', consumption: 5.6, engine: 2.0, regions: ['europe', 'asia'] },
  { name: 'Skoda Fabia', brand: 'Skoda', type: 'petrol', consumption: 5.2, engine: 1.0, regions: ['europe'] },
  { name: 'Skoda Kodiaq', brand: 'Skoda', type: 'diesel', consumption: 6.8, engine: 2.0, regions: ['europe', 'asia'] },
  
  // VOLVO
  { name: 'Volvo XC60', brand: 'Volvo', type: 'diesel', consumption: 6.8, engine: 2.0, regions: ['global'] },
  { name: 'Volvo XC90', brand: 'Volvo', type: 'hybrid', consumption: 7.5, engine: 2.0, regions: ['global'] },
  { name: 'Volvo S60', brand: 'Volvo', type: 'petrol', consumption: 7.2, engine: 2.0, regions: ['global'] },
  { name: 'Volvo V60', brand: 'Volvo', type: 'diesel', consumption: 5.9, engine: 2.0, regions: ['europe'] },
  
  // SUZUKI
  { name: 'Suzuki Swift', brand: 'Suzuki', type: 'petrol', consumption: 5.1, engine: 1.2, regions: ['global'] },
  { name: 'Suzuki Vitara', brand: 'Suzuki', type: 'petrol', consumption: 6.5, engine: 1.4, regions: ['global'] },
  { name: 'Suzuki Jimny', brand: 'Suzuki', type: 'petrol', consumption: 6.9, engine: 1.5, regions: ['global'] },
  { name: 'Suzuki Alto', brand: 'Suzuki', type: 'petrol', consumption: 4.5, engine: 0.8, regions: ['asia', 'africa'] },
  { name: 'Suzuki Baleno', brand: 'Suzuki', type: 'petrol', consumption: 5.3, engine: 1.2, regions: ['asia', 'europe'] },
  
  // ISUZU
  { name: 'Isuzu D-Max', brand: 'Isuzu', type: 'diesel', consumption: 8.2, engine: 3.0, regions: ['global'] },
  { name: 'Isuzu MU-X', brand: 'Isuzu', type: 'diesel', consumption: 8.9, engine: 3.0, regions: ['asia', 'africa', 'oceania'] },
  
  // MAHINDRA
  { name: 'Mahindra Scorpio', brand: 'Mahindra', type: 'diesel', consumption: 9.5, engine: 2.2, regions: ['asia', 'africa'] },
  { name: 'Mahindra XUV500', brand: 'Mahindra', type: 'diesel', consumption: 9.2, engine: 2.2, regions: ['asia', 'africa'] },
  { name: 'Mahindra Thar', brand: 'Mahindra', type: 'diesel', consumption: 10.1, engine: 2.2, regions: ['asia'] },
  
  // TATA
  { name: 'Tata Nexon', brand: 'Tata', type: 'petrol', consumption: 6.9, engine: 1.2, regions: ['asia', 'africa'] },
  { name: 'Tata Harrier', brand: 'Tata', type: 'diesel', consumption: 8.5, engine: 2.0, regions: ['asia'] },
  { name: 'Tata Safari', brand: 'Tata', type: 'diesel', consumption: 8.8, engine: 2.0, regions: ['asia'] },
  
  // CHINESE BRANDS
  { name: 'BYD Atto 3', brand: 'BYD', type: 'electric', consumption: 16.5, engine: 0, regions: ['asia', 'oceania', 'europe'] },
  { name: 'BYD Seal', brand: 'BYD', type: 'electric', consumption: 17.2, engine: 0, regions: ['asia', 'europe'] },
  { name: 'MG ZS EV', brand: 'MG', type: 'electric', consumption: 17.8, engine: 0, regions: ['global'] },
  { name: 'MG HS', brand: 'MG', type: 'petrol', consumption: 7.9, engine: 1.5, regions: ['global'] },
  { name: 'Geely Coolray', brand: 'Geely', type: 'petrol', consumption: 6.8, engine: 1.5, regions: ['asia', 'africa'] },
  { name: 'Haval H6', brand: 'Haval', type: 'petrol', consumption: 8.2, engine: 2.0, regions: ['asia', 'africa', 'oceania'] },
  
  // AFRICAN POPULAR MODELS
  { name: 'Datsun GO', brand: 'Datsun', type: 'petrol', consumption: 5.2, engine: 1.2, regions: ['africa', 'asia'] },
  { name: 'Renault Kwid', brand: 'Renault', type: 'petrol', consumption: 4.9, engine: 1.0, regions: ['africa', 'asia'] },
  { name: 'Opel Corsa', brand: 'Opel', type: 'petrol', consumption: 5.8, engine: 1.2, regions: ['africa', 'europe'] },
];

export function filterCarsByType(type: string): CarModel[] {
  if (type === 'all') return carDatabase;
  return carDatabase.filter(car => car.type === type);
}

export function filterCarsByRegion(region: string): CarModel[] {
  if (region === 'global') return carDatabase;
  return carDatabase.filter(car => 
    car.regions.includes(region) || car.regions.includes('global')
  );
}

export function searchCars(query: string, type?: string, region?: string): CarModel[] {
  let results = carDatabase;
  
  // Filter by type
  if (type && type !== 'all') {
    results = results.filter(car => car.type === type);
  }
  
  // Filter by region
  if (region && region !== 'global') {
    results = results.filter(car => 
      car.regions.includes(region) || car.regions.includes('global')
    );
  }
  
  // Search by query
  if (query && query.length >= 2) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(car => 
      car.name.toLowerCase().includes(lowerQuery) ||
      car.brand.toLowerCase().includes(lowerQuery)
    );
  }
  
  return results.slice(0, 10); // Limit to 10 results
}
