// Export and Share Utilities
import html2canvas from 'html2canvas';
import type { CalculationHistory } from './historyManager';

export async function exportToImage(elementId: string, filename: string = 'fuelroute-calculation'): Promise<Blob | null> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return null;
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      logging: false,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  } catch (error) {
    console.error('Error exporting to image:', error);
    return null;
  }
}

export async function downloadImage(elementId: string, filename: string = 'fuelroute-calculation'): Promise<void> {
  const blob = await exportToImage(elementId, filename);
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function shareToWhatsApp(calculation: CalculationHistory): void {
  const message = `🚗 *FuelRoute Journey Calculation*

📍 Route: ${calculation.locationFrom} → ${calculation.locationTo}
📏 Distance: ${calculation.distance.toFixed(1)} ${calculation.distanceUnit}
⛽ Fuel Needed: ${calculation.fuelAmount.toFixed(2)} ${calculation.vehicleType === 'electric' ? 'kWh' : 'L'}
💰 Total Cost: ${calculation.currencySymbol}${calculation.cost.toFixed(2)}
⭐ Efficiency: ${calculation.verdictText}
🌍 CO₂: ${calculation.co2.toFixed(2)} kg

Calculate your journey at: ${window.location.origin}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

export function shareViaEmail(calculation: CalculationHistory): void {
  const subject = encodeURIComponent('FuelRoute Journey Calculation');
  const body = encodeURIComponent(`FuelRoute Journey Calculation

Route: ${calculation.locationFrom} → ${calculation.locationTo}
Distance: ${calculation.distance.toFixed(1)} ${calculation.distanceUnit}
Fuel Needed: ${calculation.fuelAmount.toFixed(2)} ${calculation.vehicleType === 'electric' ? 'kWh' : 'L'}
Total Cost: ${calculation.currencySymbol}${calculation.cost.toFixed(2)}
Efficiency Rating: ${calculation.verdictText}
CO₂ Emissions: ${calculation.co2.toFixed(2)} kg

Vehicle: ${calculation.carModel || 'Custom'} (${calculation.vehicleType})
Consumption: ${calculation.consumption} ${calculation.vehicleType === 'electric' ? 'kWh/100km' : 'L/100km'}

Calculate your own journey at: ${window.location.origin}`);

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

export async function shareImage(elementId: string, calculation: CalculationHistory): Promise<void> {
  const blob = await exportToImage(elementId);
  if (!blob) return;

  if (navigator.share && navigator.canShare) {
    try {
      const file = new File([blob], 'fuelroute-calculation.png', { type: 'image/png' });
      await navigator.share({
        title: 'FuelRoute Calculation',
        text: `Journey from ${calculation.locationFrom} to ${calculation.locationTo}`,
        files: [file],
      });
    } catch (error) {
      console.log('Share cancelled or failed:', error);
    }
  } else {
    // Fallback: download the image
    await downloadImage(elementId);
  }
}

export function generateShareableText(calculation: CalculationHistory): string {
  return `🚗 FuelRoute Journey

📍 ${calculation.locationFrom} → ${calculation.locationTo}
📏 ${calculation.distance.toFixed(1)} ${calculation.distanceUnit}
💰 ${calculation.currencySymbol}${calculation.cost.toFixed(2)}
⭐ ${calculation.verdictText}

Calculate yours: ${window.location.origin}`;
}
