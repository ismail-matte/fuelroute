// Car Models Database with consumption data
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

// World Cities Database
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

// Currency Symbols
const currencySymbols = {
    'USD': '$', 'EUR': '€', 'GBP': '£', 'ZAR': 'R', 'AUD': 'A$',
    'CAD': 'C$', 'JPY': '¥', 'CNY': '¥', 'INR': '₹', 'NGN': '₦', 'KES': 'KSh'
};

// DOM Elements
const vehicleType = document.getElementById('vehicleType');
const carModel = document.getElementById('carModel');
const carSuggestions = document.getElementById('carSuggestions');
const engineSize = document.getElementById('engineSize');
const fuelConsumption = document.getElementById('fuelConsumption');
const distanceUnit = document.getElementById('distanceUnit');
const journeyType = document.getElementById('journeyType');
const locationFrom = document.getElementById('locationFrom');
const locationTo = document.getElementById('locationTo');
const locationVia = document.getElementById('locationVia');
const fromSuggestions = document.getElementById('fromSuggestions');
const toSuggestions = document.getElementById('toSuggestions');
const viaSuggestions = document.getElementById('viaSuggestions');
const manualDistance = document.getElementById('manualDistance');
const fuelPrice = document.getElementById('fuelPrice');
const currency = document.getElementById('currency');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('resultsSection');
const consumptionUnit = document.getElementById('consumptionUnit');
const priceUnit = document.getElementById('priceUnit');
const costPerUnit = document.getElementById('costPerUnit');

// Result Elements
const totalDistance = document.getElementById('totalDistance');
const fuelNeeded = document.getElementById('fuelNeeded');
const totalCost = document.getElementById('totalCost');
const costPerDistance = document.getElementById('costPerDistance');
const efficiencyRating = document.getElementById('efficiencyRating');
const verdict = document.getElementById('verdict');
const co2Emissions = document.getElementById('co2Emissions');
const journeySummary = document.getElementById('journeySummary');

// Event Listeners
vehicleType.addEventListener('change', updateConsumptionLabel);
distanceUnit.addEventListener('change', updateDistanceLabels);
carModel.addEventListener('input', handleCarSearch);
locationFrom.addEventListener('input', (e) => handleLocationSearch(e, fromSuggestions));
locationTo.addEventListener('input', (e) => handleLocationSearch(e, toSuggestions));
locationVia.addEventListener('input', (e) => handleLocationSearch(e, viaSuggestions));
calculateBtn.addEventListener('click', calculateJourney);
document.getElementById('exportPDF').addEventListener('click', exportReport);
document.getElementById('shareBtn').addEventListener('click', shareJourney);

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.form-group')) {
        carSuggestions.classList.remove('active');
        fromSuggestions.classList.remove('active');
        toSuggestions.classList.remove('active');
        viaSuggestions.classList.remove('active');
    }
});

// Update consumption label based on vehicle type
function updateConsumptionLabel() {
    const type = vehicleType.value;
    const unit = distanceUnit.value === 'km' ? 'L/100km' : 'MPG';
    
    if (type === 'electric') {
        consumptionUnit.textContent = distanceUnit.value === 'km' ? 'kWh/100km' : 'kWh/100mi';
        priceUnit.textContent = 'kWh';
    } else {
        consumptionUnit.textContent = unit;
        priceUnit.textContent = 'Liter';
    }
}

// Update distance labels
function updateDistanceLabels() {
    const unit = distanceUnit.value === 'km' ? 'km' : 'mile';
    costPerUnit.textContent = unit;
    updateConsumptionLabel();
}

// Handle car model search
function handleCarSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        carSuggestions.classList.remove('active');
        return;
    }
    
    const matches = carDatabase.filter(car => 
        car.name.toLowerCase().includes(query)
    ).slice(0, 8);
    
    if (matches.length > 0) {
        carSuggestions.innerHTML = matches.map(car => `
            <div class="suggestion-item" data-car='${JSON.stringify(car)}'>
                <strong>${car.name}</strong> - ${car.type} (${car.consumption} ${car.type === 'electric' ? 'kWh/100km' : 'L/100km'})
            </div>
        `).join('');
        
        carSuggestions.classList.add('active');
        
        // Add click handlers
        carSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const carData = JSON.parse(item.dataset.car);
                carModel.value = carData.name;
                vehicleType.value = carData.type;
                engineSize.value = carData.engine;
                fuelConsumption.value = carData.consumption;
                carSuggestions.classList.remove('active');
                updateConsumptionLabel();
            });
        });
    } else {
        carSuggestions.classList.remove('active');
    }
}

// Handle location search
function handleLocationSearch(e, suggestionsElement) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        suggestionsElement.classList.remove('active');
        return;
    }
    
    const matches = citiesDatabase.filter(city => 
        city.toLowerCase().includes(query)
    ).slice(0, 8);
    
    if (matches.length > 0) {
        suggestionsElement.innerHTML = matches.map(city => `
            <div class="suggestion-item" data-city="${city}">
                ${city}
            </div>
        `).join('');
        
        suggestionsElement.classList.add('active');
        
        // Add click handlers
        suggestionsElement.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                e.target.value = item.dataset.city;
                suggestionsElement.classList.remove('active');
            });
        });
    } else {
        suggestionsElement.classList.remove('active');
    }
}

// Calculate distance between two locations (mock calculation)
function calculateDistance(from, to, via = '') {
    // Mock distance calculation based on string length and characters
    // In a real app, this would use Google Maps API or similar
    const baseDistance = Math.abs(from.length * 50 + to.length * 50);
    const viaDistance = via ? via.length * 30 : 0;
    const randomFactor = Math.random() * 100 + 50;
    
    return Math.round(baseDistance + viaDistance + randomFactor);
}

// Calculate journey
function calculateJourney() {
    // Get values
    const vType = vehicleType.value;
    const consumption = parseFloat(fuelConsumption.value) || 7.5;
    const price = parseFloat(fuelPrice.value) || 1.50;
    const currencyCode = currency.value;
    const currencySymbol = currencySymbols[currencyCode];
    const isReturn = journeyType.value === 'return';
    const unit = distanceUnit.value;
    
    // Calculate distance
    let distance;
    if (manualDistance.value && parseFloat(manualDistance.value) > 0) {
        distance = parseFloat(manualDistance.value);
    } else if (locationFrom.value && locationTo.value) {
        distance = calculateDistance(locationFrom.value, locationTo.value, locationVia.value);
    } else {
        alert('Please enter locations or manual distance');
        return;
    }
    
    // Apply return trip multiplier
    if (isReturn) {
        distance *= 2;
    }
    
    // Calculate fuel/energy needed
    let fuelAmount;
    if (vType === 'electric') {
        // kWh calculation
        fuelAmount = (distance / 100) * consumption;
    } else {
        // Liters calculation
        fuelAmount = (distance / 100) * consumption;
    }
    
    // Calculate cost
    const cost = fuelAmount * price;
    const costPer = cost / distance;
    
    // Calculate CO2 emissions (kg)
    let co2;
    if (vType === 'electric') {
        co2 = 0; // Assuming clean energy
    } else if (vType === 'diesel') {
        co2 = fuelAmount * 2.68; // kg CO2 per liter diesel
    } else if (vType === 'petrol') {
        co2 = fuelAmount * 2.31; // kg CO2 per liter petrol
    } else {
        co2 = fuelAmount * 1.5; // hybrid estimate
    }
    
    // Calculate efficiency rating
    let rating, verdictText;
    if (vType === 'electric') {
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
    
    // Update results
    totalDistance.textContent = `${distance.toFixed(1)} ${unit}`;
    fuelNeeded.textContent = `${fuelAmount.toFixed(2)} ${vType === 'electric' ? 'kWh' : 'L'}`;
    totalCost.textContent = `${currencySymbol}${cost.toFixed(2)}`;
    costPerDistance.textContent = `${currencySymbol}${costPer.toFixed(3)}`;
    efficiencyRating.textContent = rating;
    verdict.textContent = verdictText;
    co2Emissions.textContent = `${co2.toFixed(2)} kg`;
    
    // Update summary
    const summaryHTML = `
        <p><strong>Route:</strong> ${locationFrom.value || 'Start'} → ${locationVia.value ? locationVia.value + ' → ' : ''}${locationTo.value || 'Destination'}</p>
        <p><strong>Journey Type:</strong> ${isReturn ? 'Return Trip' : 'One Way'}</p>
        <p><strong>Vehicle:</strong> ${carModel.value || 'Custom'} (${vType})</p>
        <p><strong>Consumption Rate:</strong> ${consumption} ${vType === 'electric' ? 'kWh/100km' : 'L/100km'}</p>
        <p><strong>Fuel Price:</strong> ${currencySymbol}${price.toFixed(2)} per ${vType === 'electric' ? 'kWh' : 'liter'}</p>
        <p><strong>Total Distance:</strong> ${distance.toFixed(1)} ${unit}</p>
        <p><strong>Estimated Cost:</strong> ${currencySymbol}${cost.toFixed(2)}</p>
        <p><strong>Environmental Impact:</strong> ${co2.toFixed(2)} kg CO₂ emissions</p>
        <p style="margin-top: 16px; padding: 12px; background: #f0f9ff; border-left: 4px solid #0a66c2; border-radius: 4px;">
            <strong>💡 Tip:</strong> ${getTip(vType, consumption, co2)}
        </p>
    `;
    
    journeySummary.innerHTML = summaryHTML;
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Get efficiency tip
function getTip(vType, consumption, co2) {
    if (vType === 'electric') {
        return 'Electric vehicles produce zero direct emissions. Consider charging during off-peak hours for lower costs.';
    } else if (co2 > 50) {
        return 'Consider carpooling or using public transport for long journeys to reduce environmental impact.';
    } else if (consumption > 10) {
        return 'Maintain steady speeds and avoid rapid acceleration to improve fuel efficiency.';
    } else {
        return 'Your vehicle has good fuel efficiency. Regular maintenance will help keep it that way.';
    }
}

// Export report
function exportReport() {
    const reportContent = `
FUELROUTE JOURNEY REPORT
========================

${journeySummary.textContent}

Generated: ${new Date().toLocaleString()}
    `.trim();
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fuelroute-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Share journey
function shareJourney() {
    const shareText = `Check out my journey calculation on FuelRoute!\n\nDistance: ${totalDistance.textContent}\nCost: ${totalCost.textContent}\nEfficiency: ${efficiencyRating.textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'FuelRoute Journey',
            text: shareText
        }).catch(() => {});
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Journey details copied to clipboard!');
        });
    }
}

// Initialize
updateConsumptionLabel();
updateDistanceLabels();
