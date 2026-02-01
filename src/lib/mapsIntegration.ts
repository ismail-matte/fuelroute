// Google Maps Integration

export interface DistanceResult {
  distance: number; // in km
  duration: number; // in minutes
  found: boolean;
  fromLat?: number;
  fromLon?: number;
  toLat?: number;
  toLon?: number;
}

// Note: In production, you'll need a Google Maps API key
// Get one free at: https://console.cloud.google.com/google/maps-apis
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

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

export function generateGoogleMapsStaticUrl(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  distance: number
): string {
  // Calculate appropriate zoom level based on distance
  let zoom = 10;
  if (distance < 50) {
    zoom = 12;
  } else if (distance < 100) {
    zoom = 11;
  } else if (distance < 200) {
    zoom = 10;
  } else if (distance < 400) {
    zoom = 9;
  } else if (distance < 800) {
    zoom = 8;
  } else {
    zoom = 7;
  }

  // Calculate center point
  const centerLat = (originLat + destLat) / 2;
  const centerLon = (originLon + destLon) / 2;

  // Generate static map URL with route
  return `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:green|label:S|${originLat},${originLon}&markers=color:red|label:D|${destLat},${destLon}&path=color:blue|weight:3|${originLat},${originLon}|${destLat},${destLon}&key=${GOOGLE_MAPS_API_KEY}`;
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
  // Try Google Maps Distance Matrix API first if API key is available
  if (GOOGLE_MAPS_API_KEY) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
        const element = data.rows[0].elements[0];
        const distance = element.distance.value / 1000; // Convert meters to km
        const duration = element.duration.value / 60; // Convert seconds to minutes

        // Get coordinates for map display
        const originCoords = await geocodeAddress(origin);
        const destCoords = await geocodeAddress(destination);

        return {
          distance,
          duration,
          found: true,
          fromLat: originCoords?.lat,
          fromLon: originCoords?.lng,
          toLat: destCoords?.lat,
          toLon: destCoords?.lng
        };
      }
    } catch (error) {
      console.error('Google Maps Distance Matrix error:', error);
    }
  }

  // Fallback to OpenStreetMap
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

      // Try multiple routing options for accuracy
      let distance: number;
      let duration: number;

      // Option 1: Use OpenRouteService (more accurate for global routes)
      try {
        const orsResponse = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62481d4867d73e748e09ab8d1c7a870e238&start=${lon1},${lat1}&end=${lon2},${lat2}`
        );
        const orsData = await orsResponse.json();

        if (orsData.features && orsData.features.length > 0) {
          distance = orsData.features[0].properties.segments[0].distance / 1000;
          duration = orsData.features[0].properties.segments[0].duration / 60;
        } else {
          // Option 2: Fallback to OSRM
          const osrmResponse = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`
          );
          const osrmData = await osrmResponse.json();

          if (osrmData.code === 'OK' && osrmData.routes.length > 0) {
            distance = osrmData.routes[0].distance / 1000;
            duration = osrmData.routes[0].duration / 60;
          } else {
            // Option 3: Fallback to Haversine formula with adjustment factor
            distance = calculateHaversineDistance(lat1, lon1, lat2, lon2) * 1.2; // Add 20% for road distance
            duration = (distance / 80) * 60;
          }
        }
      } catch (orsError) {
        console.error('OpenRouteService error:', orsError);
        // Fallback to OSRM
        const osrmResponse = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`
        );
        const osrmData = await osrmResponse.json();

        if (osrmData.code === 'OK' && osrmData.routes.length > 0) {
          distance = osrmData.routes[0].distance / 1000;
          duration = osrmData.routes[0].duration / 60;
        } else {
          // Fallback to Haversine formula with adjustment factor
          distance = calculateHaversineDistance(lat1, lon1, lat2, lon2) * 1.2;
          duration = (distance / 80) * 60;
        }
      }

      return { distance, duration, found: true, fromLat: lat1, fromLon: lon1, toLat: lat2, toLon: lon2 };
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
