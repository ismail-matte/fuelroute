// Google Maps Integration

export interface DistanceResult {
  distance: number; // in km
  duration: number; // in minutes
  found: boolean;
}

// Note: In production, you'll need a Google Maps API key
// Get one free at: https://console.cloud.google.com/google/maps-apis
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export async function calculateDistanceWithGoogleMaps(
  origin: string,
  destination: string,
  waypoints?: string[]
): Promise<DistanceResult> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key not configured');
    return { distance: 0, duration: 0, found: false };
  }

  try {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;
    
    if (waypoints && waypoints.length > 0) {
      url += `&waypoints=${waypoints.map(w => encodeURIComponent(w)).join('|')}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const element = data.rows[0].elements[0];
      return {
        distance: element.distance.value / 1000, // Convert meters to km
        duration: element.duration.value / 60, // Convert seconds to minutes
        found: true,
      };
    }
  } catch (error) {
    console.error('Google Maps API error:', error);
  }

  return { distance: 0, duration: 0, found: false };
}

export function openGoogleMapsForDistance(origin: string, destination: string, waypoints?: string): void {
  let url = `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`;
  
  if (waypoints) {
    url += `/${encodeURIComponent(waypoints)}`;
  }
  
  window.open(url, '_blank');
}

export function generateGoogleMapsEmbedUrl(origin: string, destination: string): string {
  return `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
}

// Geocoding - convert address to coordinates
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }

  return null;
}

// Alternative: Use OpenStreetMap Nominatim (Free, no API key needed)
export async function calculateDistanceWithOSM(
  origin: string,
  destination: string
): Promise<DistanceResult> {
  try {
    // Geocode origin
    const originResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(origin)}&format=json&limit=1`
    );
    const originData = await originResponse.json();

    // Geocode destination
    const destResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`
    );
    const destData = await destResponse.json();

    if (originData.length > 0 && destData.length > 0) {
      const lat1 = parseFloat(originData[0].lat);
      const lon1 = parseFloat(originData[0].lon);
      const lat2 = parseFloat(destData[0].lat);
      const lon2 = parseFloat(destData[0].lon);

      // Calculate distance using Haversine formula
      const distance = calculateHaversineDistance(lat1, lon1, lat2, lon2);
      const duration = (distance / 80) * 60; // Assume 80 km/h average speed

      return { distance, duration, found: true };
    }
  } catch (error) {
    console.error('OSM API error:', error);
  }

  return { distance: 0, duration: 0, found: false };
}

// Haversine formula for distance calculation
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Check if location exists
export async function validateLocation(location: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
    );
    const data = await response.json();
    return data.length > 0;
  } catch {
    return false;
  }
}
