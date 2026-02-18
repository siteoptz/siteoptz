// Temporary storage bridge for OAuth qualifying data
interface QualifyingData {
  business: string;
  bottlenecks: string;
  currentAIUsage: string;
  priorityOutcome: string;
  email: string;
  name: string;
  phone?: string;
  timestamp: number;
}

// In-memory store (replace with Redis/DB in production)
const qualifyingDataStore = new Map<string, QualifyingData>();

export function storeQualifyingData(email: string, data: QualifyingData): string {
  const key = `signup_${email}_${Date.now()}`;
  qualifyingDataStore.set(key, {
    ...data,
    timestamp: Date.now()
  });
  
  // Clean up old entries (older than 1 hour)
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const [k, v] of qualifyingDataStore.entries()) {
    if (v.timestamp < oneHourAgo) {
      qualifyingDataStore.delete(k);
    }
  }
  
  console.log('📦 Stored qualifying data for:', email, 'Key:', key);
  return key;
}

export function retrieveQualifyingData(email: string): QualifyingData | null {
  // Find the most recent entry for this email
  let latestData: QualifyingData | null = null;
  let latestTime = 0;
  
  for (const [key, data] of qualifyingDataStore.entries()) {
    if (data.email === email && data.timestamp > latestTime) {
      latestData = data;
      latestTime = data.timestamp;
    }
  }
  
  if (latestData) {
    console.log('📦 Retrieved qualifying data for:', email);
    return latestData;
  }
  
  console.log('📦 No qualifying data found for:', email);
  return null;
}

export function clearQualifyingData(email: string): void {
  for (const [key, data] of qualifyingDataStore.entries()) {
    if (data.email === email) {
      qualifyingDataStore.delete(key);
    }
  }
  console.log('📦 Cleared qualifying data for:', email);
}