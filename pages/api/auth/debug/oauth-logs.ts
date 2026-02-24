// pages/api/auth/debug/oauth-logs.ts
// Simple OAuth logging utility

export function addOAuthLog(message: string): void {
  console.log(`[OAuth Log] ${message}`);
}

export function logOAuthEvent(event: string, data?: any): void {
  console.log(`[OAuth Event] ${event}`, data ? JSON.stringify(data, null, 2) : '');
}