'use client';

import { useState, useEffect } from 'react';
import './fuelroute.css';

// Car Models Database
const carDatabase = [
  { name: 'Toyota Corolla', type: 'petrol', consumption: 6.5, engine: 1.8 },
  { name: 'Toyota Camry', type: 'petrol', consumption: 7.8, engine: 2.5 },
  { name: 'Toyota Prius', type: 'hybrid', consumption: 4.3, engine: 1.8 },
  { name: 'Honda Civic', type: 'petrol', consumption: 6.7, engine: 1.5 },
  { name: 'Honda Accord', type: 'petrol', consumption: 7.5, engine: 2.0 },
  { name: 'Ford Focus', type: 'petrol', consumption: 6.9, engine: 1.6 },
  { name: 'Ford Mustang', type: 'petrol', consumption: 11.2, engine: 5.0 },
  { name: 'Volkswagen Golf', type: 'petrol', consumption: 6.4, engine: 1.4 },
  { name: 'Volkswagen Passat', type: 'diesel', consumption: 5.8, engine: 2.0 },
  { name: 'BMW 3 Series', type: 'petrol', consumption: 7.2, engine: 2.0 },
  { name: 'BMW 5 Series', type: 'diesel', consumption: 6.5, engine: 2.0 },
  { name: 'Mercedes-Benz C-Class', type: 'petrol', consumption: 7.4, engine: 2.0 },
  { name: 'Mercedes-Benz E-Class', type: 'diesel', consumption: 6.2, engine: 2.0 },
  { name: 'Audi A4', type: 'petrol', consumption: 7.0, engine: 2.0 },
  { name: 'Audi A6', type: 'diesel', consumption: 6.3, engine: 2.0 },
  { name: 'Tesla Model 3', type: 'electric', consumption: 15.0, engine: 0 },
  { name: 'Tesla Model S', type: 'electric', consumption: 18.0, engine: 0 },
  { name: 'Tesla Model X', type: 'electric', consumption: 20.0, engine: 0 },
  { name: 'Tesla Model Y', type: 'electric', consumption: 16.5, engine: 0 },
  { name: 'Nissan Leaf', type: 'electric', consumption: 17.0, engine: 0 },
  { name: 'Chevrolet Bolt', type: 'electric', consumption: 16.0, engine: 0 },
  { name: 'Hyundai Ioniq', type: 'electric', consumption: 14.5, engine: 0 },
  { name: 'Kia Niro EV', type: 'electric', consumption: 15.5, engine: 0 },
  { name: 'Mazda 3', type: 'petrol', consumption: 6.6, engine: 2.0 },
  { name: 'Mazda CX-5', type: 'petrol', consumption: 8.2, engine: 2.5 },
  { name: 'Subaru Outback', type: 'petrol', consumption: 8.7, engine: 2.5 },
  { name: 'Subaru Forester', type: 'petrol', consumption: 8.4, engine: 2.5 },
  { name: 'Jeep Wrangler', type: 'petrol', consumption: 10.5, engine: 3.6 },
  { name: 'Jeep Grand Cherokee', type: 'petrol', consumption: 11.0, engine: 3.6 },
  { name: 'Range Rover Sport', type: 'diesel', consumption: 9.5, engine: 3.0 },
  { name: 'Porsche 911', type: 'petrol', consumption: 10.8, engine: 3.0 },
  { name: 'Lexus ES', type: 'hybrid', consumption: 5.8, engine: 2.5 },
  { name: 'Lexus RX', type: 'hybrid', consumption: 7.2, engine: 3.5 }
];

// Cities Database
const citiesDatabase = [
  'New York, USA', 'Los Angeles, USA', 'Chicago, USA', 'Houston, USA', 'Phoenix, USA',
  'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Liverpool, UK', 'Edinburgh, UK',
  'Paris, France', 'Lyon, France', 'Marseille, France', 'Nice, France', 'Toulouse, France',
  'Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany', 'Frankfurt, Germany', 'Cologne, Germany',
  'Rome, Italy', 'Milan, Italy', 'Venice, Italy', 'Florence, Italy', 'Naples, Italy',
  'Madrid, Spain', 'Barcelona, Spain', 'Valencia, Spain', 'Seville, Spain', 'Bilbao, Spain',
  'Tokyo, Japan', 'Osaka, Japan', 'Kyoto, Japan', 'Yokohama, Japan', 'Nagoya, Japan',
  'Beijing, China', 'Shanghai, China', 'Guangzhou, China', 'Shenzhen, China', 'Chengdu, China',
  'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Hyderabad, India', 'Chennai, India',
  'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Perth, Australia', 'Adelaide, Australia',
  'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada', 'Calgary, Canada', 'Ottawa, Canada',
  'Dubai, UAE', 'Abu Dhabi, UAE', 'Sharjah, UAE', 'Ajman, UAE', 'Ras Al Khaimah, UAE',
  'Johannesburg, South Africa', 'Cape Town, South Africa', 'Durban, South Africa', 'Pretoria, South Africa', 'Port Elizabeth, South Africa',
  'Nairobi, Kenya', 'Mombasa, Kenya', 'Kisumu, Kenya', 'Nakuru, Kenya', 'Eldoret, Kenya',
  'Lagos, Nigeria', 'Abuja, Nigeria', 'Kano, Nigeria', 'Ibadan, Nigeria', 'Port Harcourt, Nigeria',
  'Cairo, Egypt', 'Alexandria, Egypt', 'Giza, Egypt', 'Luxor, Egypt', 'Aswan, Egypt',
  'Singapore', 'Hong Kong', 'Seoul, South Korea', 'Bangkok, Thailand', 'Kuala Lumpur, Malaysia',
  'Amsterdam, Netherlands', 'Brussels, Belgium', 'Vienna, Austria', 'Zurich, Switzerland', 'Stockholm, Sweden'
];

const currencySymbols: Record<string, string> = {
  'USD': '$', 'EUR': '€', 'GBP': '£', 'ZAR': 'R', 'AUD': 'A$',
  'CAD': 'C$', 'JPY': '¥', 'CNY': '¥', 'INR': '₹', 'NGN': '₦', 'KES': 'KSh'
};

export default function Home() {
  const [vehicleType, setVehicleType] = useState('petrol');
  const [carModel, setCarModel] = useState('');
  const [engineSize, setEngineSize] = useState('1.6');
  const [fuelConsumption, setFuelConsumption] = useState('7.5');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [journeyType, setJourneyType] = useState('oneway');
  const [locationFrom, setLocationFrom] = useState('');
  const [locationTo, setLocationTo] = useState('');
  const [locationVia, setLocationVia] = useState('');
  const [manualDistance, setManualDistance] = useState('');
  const [fuelPrice, setFuelPrice] = useState('1.50');
  const [currency, setCurrency] = useState('USD');
  
  const [carSuggestions, setCarSuggestions] = useState<typeof carDatabase>([]);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [viaSuggestions, setViaSuggestions] = useState<string[]>([]);
  
  const [results, setResults] = useState<any>(null);

  const consumptionUnit = vehicleType === 'electric'
    ? (distanceUnit === 'km' ? 'kWh/100km' : 'kWh/100mi')
    : (distanceUnit === 'km' ? 'L/100km' : 'MPG');
  
  const priceUnit = vehicleType === 'electric' ? 'kWh' : 'Liter';

  // Auto-estimate consumption based on vehicle type and engine size
  const estimateConsumption = (vType: string, engine: string) => {
    const engineNum = parseFloat(engine) || 1.6;
    let estimated = 0;
    
    if (vType === 'electric') {
      estimated = 15.0; // Average EV consumption
    } else if (vType === 'diesel') {
      estimated = 4.5 + (engineNum * 1.2); // Diesel formula
    } else if (vType === 'hybrid') {
      estimated = 4.0 + (engineNum * 0.8); // Hybrid formula
    } else { // petrol
      estimated = 5.0 + (engineNum * 1.5); // Petrol formula
    }
    
    return estimated.toFixed(1);
  };

  // Update consumption when vehicle type or engine size changes
  useEffect(() => {
    if (!carModel) { // Only auto-estimate if no car model is selected
      const estimated = estimateConsumption(vehicleType, engineSize);
      setFuelConsumption(estimated);
    }
  }, [vehicleType, engineSize, carModel]);

  const handleCarSearch = (query: string) => {
    setCarModel(query);
    if (query.length < 2) {
      setCarSuggestions([]);
      return;
    }
    const matches = carDatabase.filter(car => 
      car.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
    setCarSuggestions(matches);
  };

  const selectCar = (car: typeof carDatabase[0]) => {
    setCarModel(car.name);
    setVehicleType(car.type);
    setEngineSize(car.engine.toString());
    setFuelConsumption(car.consumption.toString());
    setCarSuggestions([]);
  };

  const handleLocationSearch = (query: string, setter: (val: string[]) => void) => {
    if (query.length < 2) {
      setter([]);
      return;
    }
    const matches = citiesDatabase.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
    setter(matches);
  };

  const calculateDistance = (from: string, to: string, via: string = '') => {
    const baseDistance = Math.abs(from.length * 50 + to.length * 50);
    const viaDistance = via ? via.length * 30 : 0;
    const randomFactor = Math.random() * 100 + 50;
    return Math.round(baseDistance + viaDistance + randomFactor);
  };

  const calculateJourney = () => {
    const consumption = parseFloat(fuelConsumption) || 7.5;
    const price = parseFloat(fuelPrice) || 1.50;
    const currencySymbol = currencySymbols[currency];
    const isReturn = journeyType === 'return';
    
    let distance;
    if (manualDistance && parseFloat(manualDistance) > 0) {
      distance = parseFloat(manualDistance);
    } else if (locationFrom && locationTo) {
      distance = calculateDistance(locationFrom, locationTo, locationVia);
    } else {
      alert('Please enter locations or manual distance');
      return;
    }
    
    if (isReturn) distance *= 2;
    
    const fuelAmount = (distance / 100) * consumption;
    const cost = fuelAmount * price;
    const costPer = cost / distance;
    
    let co2;
    if (vehicleType === 'electric') {
      co2 = 0;
    } else if (vehicleType === 'diesel') {
      co2 = fuelAmount * 2.68;
    } else if (vehicleType === 'petrol') {
      co2 = fuelAmount * 2.31;
    } else {
      co2 = fuelAmount * 1.5;
    }
    
    let rating, verdictText;
    if (vehicleType === 'electric') {
      if (consumption < 15) {
        rating = '⭐⭐⭐⭐⭐';
        verdictText = 'Excellent Efficiency';
      } else if (consumption < 18) {
        rating = '⭐⭐⭐⭐';
        verdictText = 'Very Good Efficiency';
      } else {
        rating = '⭐⭐⭐';
        verdictText = 'Good Efficiency';
      }
    } else {
      if (consumption < 6) {
        rating = '⭐⭐⭐⭐⭐';
        verdictText = 'Excellent Efficiency';
      } else if (consumption < 8) {
        rating = '⭐⭐⭐⭐';
        verdictText = 'Very Good Efficiency';
      } else if (consumption < 10) {
        rating = '⭐⭐⭐';
        verdictText = 'Good Efficiency';
      } else if (consumption < 12) {
        rating = '⭐⭐';
        verdictText = 'Fair Efficiency';
      } else {
        rating = '⭐';
        verdictText = 'Low Efficiency';
      }
    }

    setResults({
      distance,
      fuelAmount,
      cost,
      costPer,
      co2,
      rating,
      verdictText,
      currencySymbol,
      consumption,
      price,
      isReturn
    });
  };

  const getTip = (vType: string, consumption: number, co2: number) => {
    if (vType === 'electric') {
      return 'Electric vehicles produce zero direct emissions. Consider charging during off-peak hours for lower costs.';
    } else if (co2 > 50) {
      return 'Consider carpooling or using public transport for long journeys to reduce environmental impact.';
    } else if (consumption > 10) {
      return 'Maintain steady speeds and avoid rapid acceleration to improve fuel efficiency.';
    } else {
      return 'Your vehicle has good fuel efficiency. Regular maintenance will help keep it that way.';
    }
  };

  return (
    <div className="fr-container">
      <header className="fr-header">
        <div className="fr-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#0a66c2"/>
            <path d="M12 28V16L20 12L28 16V28H24V20H16V28H12Z" fill="white"/>
            <circle cx="20" cy="24" r="2" fill="#0a66c2"/>
          </svg>
          <h1>FuelRoute</h1>
        </div>
        <p className="fr-tagline">Smart Journey Fuel Calculator</p>
        <p className="fr-description">Calculate fuel costs, plan your trips, and track consumption for any vehicle - from basic cars to electric vehicles.</p>
      </header>

      <section className="fr-input-section">
        <div className="fr-card">
          <h2>Plan Your Journey</h2>
          
          <div className="fr-form-grid">
            <div className="fr-form-group fr-full-width">
              <label>Vehicle Type</label>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                <option value="petrol">Petrol/Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="fr-form-group fr-full-width">
              <label>Car Model (Optional)</label>
              <input 
                type="text" 
                value={carModel}
                onChange={(e) => handleCarSearch(e.target.value)}
                placeholder="e.g., Toyota Corolla, Tesla Model 3..."
              />
              {carSuggestions.length > 0 && (
                <div className="fr-suggestions fr-active">
                  {carSuggestions.map((car, i) => (
                    <div key={i} className="fr-suggestion-item" onClick={() => selectCar(car)}>
                      <strong>{car.name}</strong> - {car.type} ({car.consumption} {car.type === 'electric' ? 'kWh/100km' : 'L/100km'})
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fr-form-group">
              <label>Engine Size (L)</label>
              <input type="number" value={engineSize} onChange={(e) => setEngineSize(e.target.value)} step="0.1" min="0.5" max="8.0" />
            </div>

            <div className="fr-form-group">
              <label>
                Consumption ({consumptionUnit})
                <span className="fr-help-text"> - Auto-estimated</span>
              </label>
              <div className="fr-input-with-help">
                <input type="number" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)} step="0.1" min="1" max="50" />
                <button
                  type="button"
                  className="fr-help-btn"
                  onClick={() => {
                    const estimated = estimateConsumption(vehicleType, engineSize);
                    setFuelConsumption(estimated);
                  }}
                  title="Click to auto-estimate consumption"
                >
                  ?
                </button>
              </div>
              <small className="fr-field-hint">
                💡 Typical: Petrol 6-10, Diesel 5-8, Electric 14-20 kWh/100km
              </small>
            </div>

            <div className="fr-form-group">
              <label>Distance Unit</label>
              <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)}>
                <option value="km">Kilometers</option>
                <option value="miles">Miles</option>
              </select>
            </div>

            <div className="fr-form-group">
              <label>Journey Type</label>
              <select value={journeyType} onChange={(e) => setJourneyType(e.target.value)}>
                <option value="oneway">One Way</option>
                <option value="return">Return Trip</option>
              </select>
            </div>

            <div className="fr-form-group fr-full-width">
              <label>From (Location A)</label>
              <input 
                type="text" 
                value={locationFrom}
                onChange={(e) => { setLocationFrom(e.target.value); handleLocationSearch(e.target.value, setFromSuggestions); }}
                placeholder="Enter starting location..."
              />
              {fromSuggestions.length > 0 && (
                <div className="fr-suggestions fr-active">
                  {fromSuggestions.map((city, i) => (
                    <div key={i} className="fr-suggestion-item" onClick={() => { setLocationFrom(city); setFromSuggestions([]); }}>
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fr-form-group fr-full-width">
              <label>To (Location B)</label>
              <input 
                type="text" 
                value={locationTo}
                onChange={(e) => { setLocationTo(e.target.value); handleLocationSearch(e.target.value, setToSuggestions); }}
                placeholder="Enter destination..."
              />
              {toSuggestions.length > 0 && (
                <div className="fr-suggestions fr-active">
                  {toSuggestions.map((city, i) => (
                    <div key={i} className="fr-suggestion-item" onClick={() => { setLocationTo(city); setToSuggestions([]); }}>
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fr-form-group fr-full-width">
              <label>Via (Location C - Optional)</label>
              <input 
                type="text" 
                value={locationVia}
                onChange={(e) => { setLocationVia(e.target.value); handleLocationSearch(e.target.value, setViaSuggestions); }}
                placeholder="Enter intermediate stop..."
              />
              {viaSuggestions.length > 0 && (
                <div className="fr-suggestions fr-active">
                  {viaSuggestions.map((city, i) => (
                    <div key={i} className="fr-suggestion-item" onClick={() => { setLocationVia(city); setViaSuggestions([]); }}>
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fr-form-group">
              <label>Or Enter Distance Manually</label>
              <input type="number" value={manualDistance} onChange={(e) => setManualDistance(e.target.value)} placeholder="Distance" step="1" min="0" />
            </div>

            <div className="fr-form-group">
              <label>Fuel Price per {priceUnit}</label>
              <input type="number" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} step="0.01" min="0" />
            </div>

            <div className="fr-form-group fr-full-width">
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="ZAR">ZAR - South African Rand (R)</option>
                <option value="AUD">AUD - Australian Dollar (A$)</option>
                <option value="CAD">CAD - Canadian Dollar (C$)</option>
                <option value="JPY">JPY - Japanese Yen (¥)</option>
                <option value="CNY">CNY - Chinese Yuan (¥)</option>
                <option value="INR">INR - Indian Rupee (₹)</option>
                <option value="NGN">NGN - Nigerian Naira (₦)</option>
                <option value="KES">KES - Kenyan Shilling (KSh)</option>
              </select>
            </div>
          </div>

          <button className="fr-btn-primary" onClick={calculateJourney}>Calculate Journey Cost</button>
        </div>
      </section>

      {results && (
        <section className="fr-results-section">
          <h2>Journey Analysis</h2>
          
          <div className="fr-results-grid">
            <div className="fr-result-card">
              <div className="fr-result-icon">📏</div>
              <div className="fr-result-label">Total Distance</div>
              <div className="fr-result-value">{results.distance.toFixed(1)} {distanceUnit}</div>
            </div>

            <div className="fr-result-card">
              <div className="fr-result-icon">⛽</div>
              <div className="fr-result-label">Fuel Needed</div>
              <div className="fr-result-value">{results.fuelAmount.toFixed(2)} {vehicleType === 'electric' ? 'kWh' : 'L'}</div>
            </div>

            <div className="fr-result-card">
              <div className="fr-result-icon">💰</div>
              <div className="fr-result-label">Total Cost</div>
              <div className="fr-result-value">{results.currencySymbol}{results.cost.toFixed(2)}</div>
            </div>

            <div className="fr-result-card">
              <div className="fr-result-icon">📊</div>
              <div className="fr-result-label">Cost per {distanceUnit}</div>
              <div className="fr-result-value">{results.currencySymbol}{results.costPer.toFixed(3)}</div>
            </div>

            <div className="fr-result-card fr-highlight">
              <div className="fr-result-icon">⭐</div>
              <div className="fr-result-label">Efficiency Rating</div>
              <div className="fr-result-value">{results.rating}</div>
              <div className="fr-result-verdict">{results.verdictText}</div>
            </div>

            <div className="fr-result-card">
              <div className="fr-result-icon">🌍</div>
              <div className="fr-result-label">CO₂ Emissions</div>
              <div className="fr-result-value">{results.co2.toFixed(2)} kg</div>
            </div>
          </div>

          <div className="fr-card fr-summary-card">
            <h3>Journey Summary</h3>
            <div className="fr-journey-summary">
              <p><strong>Route:</strong> {locationFrom || 'Start'} → {locationVia ? locationVia + ' → ' : ''}{locationTo || 'Destination'}</p>
              <p><strong>Journey Type:</strong> {results.isReturn ? 'Return Trip' : 'One Way'}</p>
              <p><strong>Vehicle:</strong> {carModel || 'Custom'} ({vehicleType})</p>
              <p><strong>Consumption Rate:</strong> {results.consumption} {vehicleType === 'electric' ? 'kWh/100km' : 'L/100km'}</p>
              <p><strong>Fuel Price:</strong> {results.currencySymbol}{results.price.toFixed(2)} per {vehicleType === 'electric' ? 'kWh' : 'liter'}</p>
              <p><strong>Total Distance:</strong> {results.distance.toFixed(1)} {distanceUnit}</p>
              <p><strong>Estimated Cost:</strong> {results.currencySymbol}{results.cost.toFixed(2)}</p>
              <p><strong>Environmental Impact:</strong> {results.co2.toFixed(2)} kg CO₂ emissions</p>
              <p style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderLeft: '4px solid #0a66c2', borderRadius: '4px' }}>
                <strong>💡 Tip:</strong> {getTip(vehicleType, results.consumption, results.co2)}
              </p>
            </div>
          </div>
        </section>
      )}

      <footer className="fr-footer">
        <p>&copy; 2024 FuelRoute. Helping you plan smarter journeys.</p>
        <p className="fr-footer-note">All calculations are estimates. Actual fuel consumption may vary based on driving conditions, vehicle condition, and driving style.</p>
      </footer>
    </div>
  );
}
