'use client';

import { useState, useEffect } from 'react';
import './fuelroute.css';
import { searchCars, type CarModel } from '../lib/carDatabase';
import { detectUserLocation, type RegionalSettings } from '../lib/geolocation';
import { searchCities, type City } from '../lib/locationService';
import { saveCalculation, getHistory, deleteCalculation, formatDate, type CalculationHistory } from '../lib/historyManager';
import { downloadImage, shareToWhatsApp, shareViaEmail, sendCalculationToEmail } from '../lib/exportUtils';
import { trackVisit, trackCalculation, getFormattedStats } from '../lib/analytics';
import { calculateDistanceWithOSM, openGoogleMapsForDistance, validateLocation } from '../lib/mapsIntegration';
import ChatWidget from '../components/ChatWidget';

const currencySymbols: Record<string, string> = {
  'USD': '$', 'EUR': '€', 'GBP': '£', 'ZAR': 'R', 'AUD': 'A$',
  'CAD': 'C$', 'JPY': '¥', 'CNY': '¥', 'INR': '₹', 'NGN': '₦', 'KES': 'KSh', 'UGX': 'USh'
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
  const [userRegion, setUserRegion] = useState<string>('global');
  
  const [carSuggestions, setCarSuggestions] = useState<CarModel[]>([]);
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);
  const [viaSuggestions, setViaSuggestions] = useState<City[]>([]);
  
  const [results, setResults] = useState<any>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [stats, setStats] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const consumptionUnit = vehicleType === 'electric' 
    ? (distanceUnit === 'km' ? 'kWh/100km' : 'kWh/100mi')
    : (distanceUnit === 'km' ? 'L/100km' : 'MPG');
  
  const priceUnit = vehicleType === 'electric' ? 'kWh' : 'Liter';

  // Auto-detect location on mount
  useEffect(() => {
    setMounted(true);
    
    // Track visit
    trackVisit();
    
    // Load stats
    setStats(getFormattedStats());
    
    detectUserLocation().then((settings: RegionalSettings) => {
      setCurrency(settings.currency);
      setDistanceUnit(settings.distanceUnit);
      setFuelPrice(settings.fuelPriceEstimate.toString());
      setUserRegion(settings.region);
    });
    
    // Load history
    setHistory(getHistory());
  }, []);

  // Auto-estimate consumption based on vehicle type and engine size
  const estimateConsumption = (vType: string, engine: string) => {
    const engineNum = parseFloat(engine) || 1.6;
    let estimated = 0;
    
    if (vType === 'electric') {
      estimated = 15.0;
    } else if (vType === 'diesel') {
      estimated = 4.5 + (engineNum * 1.2);
    } else if (vType === 'hybrid') {
      estimated = 4.0 + (engineNum * 0.8);
    } else {
      estimated = 5.0 + (engineNum * 1.5);
    }
    
    return estimated.toFixed(1);
  };

  // Update consumption when vehicle type or engine size changes
  useEffect(() => {
    if (!carModel) {
      const estimated = estimateConsumption(vehicleType, engineSize);
      setFuelConsumption(estimated);
    }
  }, [vehicleType, engineSize, carModel]);

  // Clear car model when vehicle type changes (so user can search fresh)
  useEffect(() => {
    setCarModel('');
    setCarSuggestions([]);
  }, [vehicleType]);

  const handleCarSearch = (query: string) => {
    setCarModel(query);
    if (query.length < 2) {
      setCarSuggestions([]);
      return;
    }
    // Filter by vehicle type and region
    const matches = searchCars(query, vehicleType, userRegion);
    setCarSuggestions(matches);
  };

  const selectCar = (car: CarModel) => {
    setCarModel(car.name);
    setVehicleType(car.type);
    setEngineSize(car.engine.toString());
    setFuelConsumption(car.consumption.toString());
    setCarSuggestions([]);
  };

  const handleLocationSearch = (query: string, setter: (val: City[]) => void) => {
    if (query.length < 2) {
      setter([]);
      return;
    }
    const matches = searchCities(query);
    setter(matches);
  };

  const calculateDistance = (from: string, to: string, via: string = '') => {
    const baseDistance = Math.abs(from.length * 50 + to.length * 50);
    const viaDistance = via ? via.length * 30 : 0;
    const randomFactor = Math.random() * 100 + 50;
    return Math.round(baseDistance + viaDistance + randomFactor);
  };

  const calculateJourney = async () => {
    // Track calculation
    trackCalculation();
    
    const consumption = parseFloat(fuelConsumption) || 7.5;
    const price = parseFloat(fuelPrice) || 1.50;
    const currencySymbol = currencySymbols[currency];
    const isReturn = journeyType === 'return';
    
    let distance;
    if (manualDistance && parseFloat(manualDistance) > 0) {
      distance = parseFloat(manualDistance);
    } else if (locationFrom && locationTo) {
      // Try to get real distance from OpenStreetMap
      setIsCalculatingDistance(true);
      const distanceResult = await calculateDistanceWithOSM(locationFrom, locationTo);
      setIsCalculatingDistance(false);
      
      if (distanceResult.found) {
        distance = distanceResult.distance;
      } else {
        // Fallback to mock calculation
        distance = calculateDistance(locationFrom, locationTo, locationVia);
        // Show helper message
        if (confirm('Could not find exact distance. Would you like to check Google Maps for accurate distance?')) {
          openGoogleMapsForDistance(locationFrom, locationTo, locationVia);
          return;
        }
      }
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

    // Calculate estimated journey time (assuming average speed)
    const avgSpeed = vehicleType === 'electric' ? 70 : 80; // km/h
    const durationHours = distance / avgSpeed;
    const hours = Math.floor(durationHours);
    const minutes = Math.round((durationHours - hours) * 60);

    const calculationResult = {
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
      isReturn,
      vehicleType,
      carModel,
      locationFrom,
      locationTo,
      locationVia,
      distanceUnit,
      currency,
      duration: { hours, minutes, total: durationHours }
    };

    setResults(calculationResult);

    // Save to history
    saveCalculation({
      vehicleType,
      carModel: carModel || 'Custom',
      locationFrom: locationFrom || 'Start',
      locationTo: locationTo || 'Destination',
      locationVia,
      distance,
      distanceUnit,
      fuelAmount,
      cost,
      currency,
      currencySymbol,
      consumption,
      co2,
      rating,
      verdictText
    });

    // Refresh history
    setHistory(getHistory());
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

  const loadHistoryItem = (item: CalculationHistory) => {
    setVehicleType(item.vehicleType);
    setCarModel(item.carModel === 'Custom' ? '' : item.carModel);
    setLocationFrom(item.locationFrom === 'Start' ? '' : item.locationFrom);
    setLocationTo(item.locationTo === 'Destination' ? '' : item.locationTo);
    setLocationVia(item.locationVia || '');
    setFuelConsumption(item.consumption.toString());
    setCurrency(item.currency);
    setDistanceUnit(item.distanceUnit);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = (id: string) => {
    deleteCalculation(id);
    setHistory(getHistory());
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
        
        {history.length > 0 && (
          <button 
            className="fr-history-toggle"
            onClick={() => setShowHistory(!showHistory)}
          >
            📊 {showHistory ? 'Hide' : 'Show'} History ({history.length})
          </button>
        )}
      </header>

      {showHistory && history.length > 0 && (
        <section className="fr-history-section">
          <h2>Recent Calculations</h2>
          <div className="fr-history-grid">
            {history.map((item) => (
              <div key={item.id} className="fr-history-card">
                <div className="fr-history-header">
                  <span className="fr-history-date">{formatDate(item.timestamp)}</span>
                  <button 
                    className="fr-history-delete"
                    onClick={() => handleDeleteHistory(item.id)}
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
                <div className="fr-history-route">
                  📍 {item.locationFrom} → {item.locationTo}
                </div>
                <div className="fr-history-details">
                  <div>📏 {item.distance.toFixed(1)} {item.distanceUnit}</div>
                  <div>💰 {item.currencySymbol}{item.cost.toFixed(2)}</div>
                </div>
                <div className="fr-history-vehicle">
                  🚗 {item.carModel} ({item.vehicleType})
                </div>
                <div className="fr-history-actions">
                  <button 
                    className="fr-btn-small"
                    onClick={() => loadHistoryItem(item)}
                  >
                    Load
                  </button>
                  <button 
                    className="fr-btn-small"
                    onClick={() => shareToWhatsApp(item)}
                  >
                    WhatsApp
                  </button>
                  <button 
                    className="fr-btn-small"
                    onClick={() => shareViaEmail(item)}
                  >
                    Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
              <label>Car Model (Optional) - Filtered by {vehicleType}</label>
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
                    <div key={i} className="fr-suggestion-item" onClick={() => { setLocationFrom(city.display); setFromSuggestions([]); }}>
                      {city.display}
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
                    <div key={i} className="fr-suggestion-item" onClick={() => { setLocationTo(city.display); setToSuggestions([]); }}>
                      {city.display}
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
                    <div key={i} className="fr-suggestion-item" onClick={() => { setLocationVia(city.display); setViaSuggestions([]); }}>
                      {city.display}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fr-form-group">
              <label>Or Enter Distance Manually</label>
              <input type="number" value={manualDistance} onChange={(e) => setManualDistance(e.target.value)} placeholder="Distance" step="1" min="0" />
              {locationFrom && locationTo && (
                <button
                  type="button"
                  className="fr-maps-helper"
                  onClick={() => openGoogleMapsForDistance(locationFrom, locationTo, locationVia)}
                >
                  🗺️ Find distance on Google Maps
                </button>
              )}
            </div>

            <div className="fr-form-group">
              <label>
                Fuel Price per {priceUnit}
                <span className="fr-help-text"> - Auto-set by region</span>
              </label>
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
                <option value="UGX">UGX - Ugandan Shilling (USh)</option>
              </select>
            </div>
          </div>

          <button className="fr-btn-primary" onClick={calculateJourney}>Calculate Journey Cost</button>
        </div>
      </section>

      {results && (
        <section className="fr-results-section" id="results-export">
          <h2>Journey Analysis</h2>
          
          <div className="fr-results-grid">
            <div
              className={`fr-result-card ${expandedCard === 'distance' ? 'fr-expanded' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'distance' ? null : 'distance')}
            >
              <div className="fr-result-icon">📏</div>
              <div className="fr-result-label">Total Distance</div>
              <div className="fr-result-value">{results.distance.toFixed(1)} {distanceUnit}</div>
              {expandedCard === 'distance' && (
                <div className="fr-card-details">
                  <p><strong>Route Analysis:</strong></p>
                  <p>• One-way distance: {(results.distance / (results.isReturn ? 2 : 1)).toFixed(1)} {distanceUnit}</p>
                  <p>• Journey type: {results.isReturn ? 'Return trip (×2)' : 'One-way'}</p>
                  <p>• Calculated using: {locationFrom && locationTo ? 'Real GPS coordinates' : 'Manual entry'}</p>
                </div>
              )}
            </div>

            <div
              className={`fr-result-card ${expandedCard === 'time' ? 'fr-expanded' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'time' ? null : 'time')}
            >
              <div className="fr-result-icon">⏱️</div>
              <div className="fr-result-label">Estimated Time</div>
              <div className="fr-result-value">
                {results.duration.hours}h {results.duration.minutes}m
              </div>
              {expandedCard === 'time' && (
                <div className="fr-card-details">
                  <p><strong>Time Breakdown:</strong></p>
                  <p>• Driving time: {results.duration.hours}h {results.duration.minutes}m</p>
                  <p>• Average speed: {vehicleType === 'electric' ? '70' : '80'} km/h</p>
                  <p>• Recommended breaks: {Math.floor(results.duration.total / 2)} stops</p>
                  <p>💡 Add 15-20% for traffic and breaks</p>
                </div>
              )}
            </div>

            <div
              className={`fr-result-card ${expandedCard === 'fuel' ? 'fr-expanded' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'fuel' ? null : 'fuel')}
            >
              <div className="fr-result-icon">⛽</div>
              <div className="fr-result-label">Fuel Needed</div>
              <div className="fr-result-value">{results.fuelAmount.toFixed(2)} {vehicleType === 'electric' ? 'kWh' : 'L'}</div>
              {expandedCard === 'fuel' && (
                <div className="fr-card-details">
                  <p><strong>Fuel Analysis:</strong></p>
                  <p>• Consumption rate: {results.consumption} {vehicleType === 'electric' ? 'kWh/100km' : 'L/100km'}</p>
                  <p>• Tank capacity needed: {(results.fuelAmount / 50 * 100).toFixed(0)}% of typical tank</p>
                  <p>• Refuel stops: {Math.ceil(results.fuelAmount / 50)}</p>
                  <p>💡 Fill up before departure for best prices</p>
                </div>
              )}
            </div>

            <div
              className={`fr-result-card ${expandedCard === 'cost' ? 'fr-expanded' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'cost' ? null : 'cost')}
            >
              <div className="fr-result-icon">💰</div>
              <div className="fr-result-label">Total Cost</div>
              <div className="fr-result-value">{results.currencySymbol}{results.cost.toFixed(2)}</div>
              {expandedCard === 'cost' && (
                <div className="fr-card-details">
                  <p><strong>Cost Breakdown:</strong></p>
                  <p>• Fuel price: {results.currencySymbol}{results.price.toFixed(2)} per {vehicleType === 'electric' ? 'kWh' : 'liter'}</p>
                  <p>• Cost per {distanceUnit}: {results.currencySymbol}{results.costPer.toFixed(3)}</p>
                  <p>• One-way cost: {results.currencySymbol}{(results.cost / (results.isReturn ? 2 : 1)).toFixed(2)}</p>
                  <p>💡 Carpooling can reduce cost by 50-75%</p>
                </div>
              )}
            </div>

            <div
              className={`fr-result-card fr-highlight ${expandedCard === 'efficiency' ? 'fr-expanded' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'efficiency' ? null : 'efficiency')}
            >
              <div className="fr-result-icon">⭐</div>
              <div className="fr-result-label">Efficiency Rating</div>
              <div className="fr-result-value">{results.rating}</div>
              <div className="fr-result-verdict">{results.verdictText}</div>
              {expandedCard === 'efficiency' && (
                <div className="fr-card-details">
                  <p><strong>Efficiency Insights:</strong></p>
                  <p>• Your vehicle: {results.consumption} {vehicleType === 'electric' ? 'kWh/100km' : 'L/100km'}</p>
                  <p>• Average for {vehicleType}: {vehicleType === 'electric' ? '16' : vehicleType === 'diesel' ? '6.5' : '7.5'} {vehicleType === 'electric' ? 'kWh/100km' : 'L/100km'}</p>
                  <p>• Potential savings: {results.consumption < 8 ? 'Already efficient!' : 'Switch to hybrid/EV for 40-60% savings'}</p>
                </div>
              )}
            </div>

            <div
              className={`fr-result-card ${expandedCard === 'co2' ? 'fr-expanded' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'co2' ? null : 'co2')}
            >
              <div className="fr-result-icon">🌍</div>
              <div className="fr-result-label">CO₂ Emissions</div>
              <div className="fr-result-value">{results.co2.toFixed(2)} kg</div>
              {expandedCard === 'co2' && (
                <div className="fr-card-details">
                  <p><strong>Environmental Impact:</strong></p>
                  <p>• CO₂ per {distanceUnit}: {(results.co2 / results.distance).toFixed(3)} kg</p>
                  <p>• Equivalent to: {(results.co2 / 0.4).toFixed(0)} km driven by average car</p>
                  <p>• Trees needed to offset: {Math.ceil(results.co2 / 21)} trees/year</p>
                  <p>🌱 {vehicleType === 'electric' ? 'Zero direct emissions - great choice!' : 'Consider carpooling or EVs to reduce impact'}</p>
                </div>
              )}
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

          <div className="fr-export-actions">
            <button
              className="fr-btn-new-analysis"
              onClick={() => {
                setResults(null);
                setLocationFrom('');
                setLocationTo('');
                setLocationVia('');
                setManualDistance('');
                setCarModel('');
                setExpandedCard(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              🔄 New Analysis
            </button>
            <button
              className="fr-btn-secondary"
              onClick={() => downloadImage('results-export', `fuelroute-${Date.now()}`)}
            >
              📥 Download as Image
            </button>
            <button
              className="fr-btn-secondary"
              onClick={() => shareToWhatsApp(history[0])}
            >
              💬 Share on WhatsApp
            </button>
            <button
              className="fr-btn-secondary"
              onClick={() => setShowEmailPopup(true)}
            >
              📧 Email to Someone
            </button>
            <button
              className="fr-btn-secondary"
              onClick={() => openGoogleMapsForDistance(locationFrom, locationTo, locationVia)}
            >
              🗺️ View on Google Maps
            </button>
          </div>
        </section>
      )}

      {/* Email Share Modal */}
      {showEmailPopup && results && (
        <div className="fr-modal-overlay" onClick={() => setShowEmailPopup(false)}>
          <div className="fr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fr-modal-close" onClick={() => setShowEmailPopup(false)}>×</button>
            <h2>📧 Email Calculation</h2>
            <p className="fr-modal-intro">
              Send this journey calculation to an email address:
            </p>
            
            <div className="fr-email-form">
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="recipient@email.com"
                className="fr-email-input"
              />
              <button
                onClick={async () => {
                  if (!recipientEmail.trim()) {
                    alert('Please enter an email address');
                    return;
                  }
                  await sendCalculationToEmail({ email: recipientEmail, calculation: history[0] });
                  setShowEmailPopup(false);
                  setRecipientEmail('');
                  alert('Email client opened! Send the email to complete.');
                }}
                className="fr-btn-primary"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isCalculatingDistance && (
        <div className="fr-modal-overlay">
          <div className="fr-loading-card">
            <div className="fr-spinner"></div>
            <p>Calculating distance...</p>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupport && (
        <div className="fr-modal-overlay" onClick={() => setShowSupport(false)}>
          <div className="fr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fr-modal-close" onClick={() => setShowSupport(false)}>×</button>
            <h2>💚 Support FuelRoute</h2>
            <p className="fr-modal-intro">
              FuelRoute is <strong>100% free</strong> and helps thousands of users plan their journeys worldwide.
              Your support helps us keep the service running and improve it for everyone!
            </p>
            
            <div className="fr-donation-options">
              <div className="fr-donation-card">
                <h3>💳 PayPal</h3>
                <p>Donate via PayPal (International)</p>
                <a
                  href="https://www.paypal.com/paypalme/imatte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fr-btn-donate"
                >
                  Donate via PayPal
                </a>
                <small>Email: imatte@engineer.com</small>
              </div>
              
              <div className="fr-donation-card">
                <h3>📱 Mobile Money</h3>
                <p>Send via Mobile Money (Uganda)</p>
                <div className="fr-phone-number">
                  <strong>+256 782 475 028</strong>
                </div>
                <small>MTN/Airtel Money accepted</small>
              </div>
            </div>
            
            <div className="fr-stats">
              <p><strong>📊 Usage Stats:</strong> {mounted ? stats : 'Loading...'}</p>
            </div>
            
            <p className="fr-thank-you">
              🙏 Thank you for supporting sustainable, eco-friendly travel planning!
            </p>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fr-modal-overlay" onClick={() => setShowContact(false)}>
          <div className="fr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fr-modal-close" onClick={() => setShowContact(false)}>×</button>
            <h2>📧 Contact Us</h2>
            <p className="fr-modal-intro">
              Have questions, suggestions, or need support? We'd love to hear from you!
            </p>
            
            <div className="fr-contact-info">
              <div className="fr-contact-item">
                <h3>📧 General Inquiries</h3>
                <a href="mailto:info@tech-center.com" className="fr-contact-link">
                  info@tech-center.com
                </a>
              </div>
              
              <div className="fr-contact-item">
                <h3>📱 WhatsApp</h3>
                <a
                  href="https://wa.me/256782475028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fr-contact-link"
                >
                  +256 782 475 028
                </a>
              </div>
              
              <div className="fr-contact-item">
                <h3>💼 Business & Partnerships</h3>
                <a href="mailto:imatte@engineer.com" className="fr-contact-link">
                  imatte@engineer.com
                </a>
              </div>
            </div>
            
            <div className="fr-quick-contact">
              <h3>Quick Message</h3>
              <p>Send us a message directly:</p>
              <a
                href="mailto:info@tech-center.com?subject=FuelRoute Inquiry&body=Hello FuelRoute Team,%0D%0A%0D%0AI have a question about..."
                className="fr-btn-secondary"
              >
                📧 Send Email
              </a>
            </div>
          </div>
        </div>
      )}

      <footer className="fr-footer">
        <div className="fr-footer-content">
          <div className="fr-footer-section">
            <h3>FuelRoute</h3>
            <p>Smart journey fuel calculator for the world</p>
            {mounted && <p className="fr-stats-small">📊 {stats}</p>}
          </div>
          
          <div className="fr-footer-section">
            <h3>Quick Links</h3>
            <button onClick={() => setShowSupport(true)} className="fr-footer-link">💚 Support Us</button>
            <button onClick={() => setShowContact(true)} className="fr-footer-link">📧 Contact</button>
            <button onClick={() => setShowHistory(true)} className="fr-footer-link">📊 History</button>
            <a href="/admin" className="fr-footer-link">🎛️ Admin Panel</a>
          </div>
          
          <div className="fr-footer-section">
            <h3>Connect</h3>
            <a href="mailto:info@tech-center.com" className="fr-footer-link">Email Us</a>
            <a href="https://wa.me/256782475028" target="_blank" rel="noopener noreferrer" className="fr-footer-link">WhatsApp</a>
            <a href="https://www.paypal.com/paypalme/imatte" target="_blank" rel="noopener noreferrer" className="fr-footer-link">Donate</a>
          </div>
        </div>
        
        <div className="fr-footer-bottom">
          <p>&copy; 2024 FuelRoute. Helping you plan smarter, greener journeys.</p>
          <p className="fr-footer-note">All calculations are estimates. Actual fuel consumption may vary based on driving conditions, vehicle condition, and driving style.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
