// AI Chatbot with Free LLM Integration

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  needsHumanReview?: boolean;
}

const FAQ_RESPONSES: Record<string, string> = {
  'how': 'To use FuelRoute: 1) Select your vehicle type, 2) Enter your journey details (from/to locations), 3) Click "Calculate Journey Cost". The app will show you fuel costs, distance, and CO₂ emissions!',
  'use': 'To use FuelRoute: 1) Select your vehicle type, 2) Enter your journey details (from/to locations), 3) Click "Calculate Journey Cost". The app will show you fuel costs, distance, and CO₂ emissions!',
  'free': 'Yes! FuelRoute is 100% FREE to use! 🎉 We accept voluntary donations to keep the service running. Click the "Support Us" button if you\'d like to contribute.',
  'cost': 'FuelRoute is 100% FREE to use! We accept voluntary donations to keep the service running. Click the "Support Us" button to contribute.',
  'price': 'FuelRoute is completely FREE! No subscriptions, no hidden fees. We\'re donation-supported to help everyone plan better journeys.',
  'pay': 'You don\'t need to pay anything! FuelRoute is 100% free. Donations are welcome but optional.',
  'accuracy': 'Our calculations are estimates based on standard fuel consumption rates. Actual consumption may vary based on driving conditions, vehicle condition, and driving style.',
  'accurate': 'We use real distance calculations from OpenStreetMap and standard fuel consumption data. Results are typically within 5-10% of actual costs.',
  'electric': 'Yes! FuelRoute supports electric vehicles. Select "Electric" as your vehicle type and enter kWh/100km consumption. We\'ll calculate electricity costs instead of fuel.',
  'ev': 'Yes! FuelRoute fully supports electric vehicles (EVs). We have Tesla, Nissan Leaf, BYD, and many more EV models in our database.',
  'history': 'Your calculation history is saved locally in your browser. Click "Show History" to view past calculations. You can load, share, or delete them anytime.',
  'share': 'After calculating, you can share your journey via WhatsApp, Email, or download as an image. Look for the share buttons below your results!',
  'export': 'You can export your results as a PNG image, share via WhatsApp, or email to anyone. All export options are below your calculation results.',
  'support': 'You can support FuelRoute via PayPal (imatte@engineer.com) or Mobile Money (+256 782 475 028). Every donation helps us keep the service free!',
  'donate': 'Thank you for considering! You can donate via PayPal (paypal.me/imatte) or Mobile Money (+256 782 475 028). Click "Support Us" button for details.',
  'contact': 'Email us at info@tech-center.com for general inquiries, or imatte@engineer.com for business matters. You can also WhatsApp us at +256 782 475 028.',
  'email': 'Contact us at info@tech-center.com for general inquiries, or imatte@engineer.com for business matters.',
  'countries': 'FuelRoute works worldwide! We support 60+ countries with auto-detected currency and fuel prices. We have 500+ cities and 200+ car models from all regions.',
  'global': 'Yes! FuelRoute is truly global - 60+ countries, 500+ cities, 200+ car models, 11 currencies. Works anywhere in the world!',
  'mobile': 'Yes! FuelRoute is fully responsive and works great on mobile devices. All features are available on phones and tablets.',
  'app': 'FuelRoute works perfectly in your mobile browser! Just visit the website on your phone. A native app may come in the future.',
  'distance': 'We calculate real distances using OpenStreetMap API (free). If a location isn\'t found, you can check Google Maps or enter distance manually.',
  'maps': 'We integrate with both OpenStreetMap (for automatic distance) and Google Maps (for verification). Click the "Find distance on Google Maps" button!',
  'car': 'We have 200+ car models from brands like Toyota, Honda, Ford, VW, BMW, Mercedes, Tesla, Hyundai, Kia, and many more. Just start typing to search!',
  'diesel': 'Yes! We support diesel vehicles. Select "Diesel" as vehicle type and you\'ll see only diesel cars in the search.',
  'petrol': 'Yes! We support petrol/gasoline vehicles. Select "Petrol" and search from 100+ petrol car models.',
  'hybrid': 'Yes! We support hybrid vehicles like Toyota Prius, Lexus ES, and more. Select "Hybrid" as your vehicle type.',
};

function findBestMatch(query: string): string | null {
  const lowerQuery = query.toLowerCase();
  
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowerQuery.includes(key)) {
      return response;
    }
  }
  
  return null;
}

function isComplexQuery(query: string): boolean {
  const complexKeywords = ['bug', 'error', 'broken', 'not working', 'problem', 'issue', 'partnership', 'business', 'api', 'integration', 'custom'];
  const lowerQuery = query.toLowerCase();
  
  return complexKeywords.some(keyword => lowerQuery.includes(keyword));
}

export async function getChatResponse(userMessage: string): Promise<ChatMessage> {
  // First, check FAQ
  const faqResponse = findBestMatch(userMessage);
  if (faqResponse) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: faqResponse,
      timestamp: Date.now(),
    };
  }
  
  // Check if it's a complex query
  if (isComplexQuery(userMessage)) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'This seems like a complex inquiry that needs human attention. Please provide your email address, and our team will get back to you within 24 hours with a comprehensive response.',
      timestamp: Date.now(),
      needsHumanReview: true,
    };
  }
  
  // Try free LLM API (using Hugging Face Inference API - free tier)
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `User: ${userMessage}\nAssistant:`,
        parameters: {
          max_length: 150,
          temperature: 0.7,
        },
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      const aiResponse = data[0]?.generated_text || 'I\'m here to help! Could you rephrase your question?';
      
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };
    }
  } catch (error) {
    console.error('LLM API error:', error);
  }
  
  // Fallback response
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: 'I\'m here to help! For immediate answers, try asking about: how to use FuelRoute, costs, electric vehicles, sharing results, or contact information. For complex inquiries, please email info@tech-center.com.',
    timestamp: Date.now(),
  };
}

export async function sendEmailInquiry(userEmail: string, userMessage: string, chatHistory: ChatMessage[]): Promise<boolean> {
  try {
    // In production, this would call your backend API to send email
    // For now, we'll use mailto as fallback
    const subject = encodeURIComponent('FuelRoute Support Inquiry');
    const body = encodeURIComponent(`
User Email: ${userEmail}

User Message:
${userMessage}

Chat History:
${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n\n')}

---
Sent from FuelRoute Chat Assistant
    `);
    
    window.location.href = `mailto:info@tech-center.com?subject=${subject}&body=${body}`;
    return true;
  } catch (error) {
    console.error('Email inquiry error:', error);
    return false;
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  localStorage.setItem('fuelroute_chat_history', JSON.stringify(messages));
}

export function loadChatHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem('fuelroute_chat_history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
