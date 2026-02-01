// Admin Authentication and Management

export interface AdminConfig {
  username: string;
  passwordHash: string;
  email: string;
  socialMedia: {
    twitter?: { apiKey: string; apiSecret: string; accessToken: string; accessSecret: string };
    facebook?: { pageId: string; accessToken: string };
    instagram?: { username: string; password: string };
    linkedin?: { accessToken: string };
  };
  autoPost: boolean;
  postFrequency: 'daily' | 'weekly' | 'monthly';
}

const DEFAULT_ADMIN: AdminConfig = {
  username: 'Admin',
  passwordHash: hashPassword('1pp5@dm1n'), // Default password
  email: 'imatte@engineer.com',
  socialMedia: {},
  autoPost: false,
  postFrequency: 'weekly',
};

// Simple hash function (in production, use bcrypt or similar)
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export function initializeAdmin(): void {
  const stored = localStorage.getItem('fuelroute_admin_config');
  if (!stored) {
    localStorage.setItem('fuelroute_admin_config', JSON.stringify(DEFAULT_ADMIN));
  }
}

export function login(username: string, password: string): boolean {
  const config = getAdminConfig();
  const passwordHash = hashPassword(password);
  
  if (config.username === username && config.passwordHash === passwordHash) {
    sessionStorage.setItem('fuelroute_admin_session', 'true');
    sessionStorage.setItem('fuelroute_admin_login_time', Date.now().toString());
    return true;
  }
  
  return false;
}

export function logout(): void {
  sessionStorage.removeItem('fuelroute_admin_session');
  sessionStorage.removeItem('fuelroute_admin_login_time');
}

export function isLoggedIn(): boolean {
  const session = sessionStorage.getItem('fuelroute_admin_session');
  const loginTime = sessionStorage.getItem('fuelroute_admin_login_time');
  
  if (!session || !loginTime) return false;
  
  // Session expires after 24 hours
  const elapsed = Date.now() - parseInt(loginTime);
  if (elapsed > 24 * 60 * 60 * 1000) {
    logout();
    return false;
  }
  
  return true;
}

export function getAdminConfig(): AdminConfig {
  try {
    const stored = localStorage.getItem('fuelroute_admin_config');
    return stored ? JSON.parse(stored) : DEFAULT_ADMIN;
  } catch {
    return DEFAULT_ADMIN;
  }
}

export function updateAdminConfig(config: Partial<AdminConfig>): void {
  const current = getAdminConfig();
  const updated = { ...current, ...config };
  localStorage.setItem('fuelroute_admin_config', JSON.stringify(updated));
}

export function changePassword(oldPassword: string, newPassword: string): boolean {
  const config = getAdminConfig();
  const oldHash = hashPassword(oldPassword);
  
  if (config.passwordHash !== oldHash) {
    return false;
  }
  
  updateAdminConfig({ passwordHash: hashPassword(newPassword) });
  return true;
}

export async function requestPasswordReset(email: string): Promise<boolean> {
  const config = getAdminConfig();
  
  if (config.email !== email) {
    return false;
  }
  
  // Generate reset token
  const resetToken = Math.random().toString(36).substring(2, 15);
  const resetExpiry = Date.now() + (60 * 60 * 1000); // 1 hour
  
  localStorage.setItem('fuelroute_reset_token', resetToken);
  localStorage.setItem('fuelroute_reset_expiry', resetExpiry.toString());
  
  // Send email (in production, this would be a backend API call)
  const subject = encodeURIComponent('FuelRoute Admin Password Reset');
  const body = encodeURIComponent(`
Your password reset token: ${resetToken}

This token expires in 1 hour.

To reset your password, enter this token in the admin panel.

If you didn't request this reset, please ignore this email.

---
FuelRoute Admin System
  `);
  
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  return true;
}

export function resetPassword(token: string, newPassword: string): boolean {
  const storedToken = localStorage.getItem('fuelroute_reset_token');
  const expiry = localStorage.getItem('fuelroute_reset_expiry');
  
  if (!storedToken || !expiry) return false;
  
  if (Date.now() > parseInt(expiry)) {
    localStorage.removeItem('fuelroute_reset_token');
    localStorage.removeItem('fuelroute_reset_expiry');
    return false;
  }
  
  if (storedToken !== token) return false;
  
  updateAdminConfig({ passwordHash: hashPassword(newPassword) });
  localStorage.removeItem('fuelroute_reset_token');
  localStorage.removeItem('fuelroute_reset_expiry');
  
  return true;
}

// Social Media Auto-Posting
export interface SocialPost {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  content: string;
  image?: string;
}

export function generateSocialPost(): SocialPost {
  const stats = JSON.parse(localStorage.getItem('fuelroute_analytics') || '{}');
  const posts = [
    {
      platform: 'twitter' as const,
      content: `🚗 Plan your journey with FuelRoute! Calculate fuel costs, track emissions, and save money. 100% FREE! 🌍\n\n✅ ${stats.totalCalculations || 0}+ calculations done\n✅ 200+ car models\n✅ 60+ countries supported\n\nTry it now! #FuelCalculator #EcoTravel`,
    },
    {
      platform: 'facebook' as const,
      content: `Planning a road trip? 🚗\n\nFuelRoute helps you:\n✅ Calculate exact fuel costs\n✅ Compare vehicle efficiency\n✅ Track CO₂ emissions\n✅ Save money on every journey\n\n100% FREE to use! Join ${stats.totalVisits || 0}+ users worldwide.\n\n#RoadTrip #FuelSavings #EcoFriendly`,
    },
    {
      platform: 'linkedin' as const,
      content: `Introducing FuelRoute - The Smart Journey Fuel Calculator\n\nPerfect for:\n• Individual travelers\n• Fleet managers\n• Business expense tracking\n• Environmental reporting\n\nFeatures:\n✓ 200+ global car models\n✓ Real-time cost calculations\n✓ CO₂ emissions tracking\n✓ Multi-currency support\n\n100% free, donation-supported. #FleetManagement #Sustainability`,
    },
  ];
  
  return posts[Math.floor(Math.random() * posts.length)];
}

export async function postToSocialMedia(post: SocialPost): Promise<boolean> {
  const config = getAdminConfig();
  
  // In production, this would call actual social media APIs
  // For now, we'll just log and return success
  console.log(`Posting to ${post.platform}:`, post.content);
  
  // Store post history
  const history = JSON.parse(localStorage.getItem('fuelroute_post_history') || '[]');
  history.unshift({
    ...post,
    timestamp: Date.now(),
    status: 'success',
  });
  localStorage.setItem('fuelroute_post_history', JSON.stringify(history.slice(0, 50)));
  
  return true;
}

// Initialize admin on load
if (typeof window !== 'undefined') {
  initializeAdmin();
}
