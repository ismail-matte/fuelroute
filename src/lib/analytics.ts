// Analytics and User Tracking

interface AnalyticsData {
  totalVisits: number;
  totalCalculations: number;
  uniqueUsers: number;
  lastVisit: number;
  firstVisit: number;
}

const ANALYTICS_KEY = 'fuelroute_analytics';
const USER_ID_KEY = 'fuelroute_user_id';

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function trackVisit(): void {
  const analytics = getAnalytics();
  analytics.totalVisits += 1;
  analytics.lastVisit = Date.now();
  
  if (!analytics.firstVisit) {
    analytics.firstVisit = Date.now();
  }
  
  saveAnalytics(analytics);
  
  // Also track user ID
  getUserId();
}

export function trackCalculation(): void {
  const analytics = getAnalytics();
  analytics.totalCalculations += 1;
  saveAnalytics(analytics);
}

export function getAnalytics(): AnalyticsData {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    if (!stored) {
      return {
        totalVisits: 0,
        totalCalculations: 0,
        uniqueUsers: 1,
        lastVisit: Date.now(),
        firstVisit: Date.now(),
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    return {
      totalVisits: 0,
      totalCalculations: 0,
      uniqueUsers: 1,
      lastVisit: Date.now(),
      firstVisit: Date.now(),
    };
  }
}

function saveAnalytics(data: AnalyticsData): void {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

export function getFormattedStats(): string {
  const analytics = getAnalytics();
  return `Visits: ${analytics.totalVisits} | Calculations: ${analytics.totalCalculations}`;
}

// Send analytics to server (optional - for future implementation)
export async function sendAnalyticsToServer(): Promise<void> {
  const analytics = getAnalytics();
  const userId = getUserId();
  
  try {
    // This would send to your backend API
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...analytics, userId }),
    // });
    console.log('Analytics:', { ...analytics, userId });
  } catch (error) {
    console.error('Failed to send analytics:', error);
  }
}
