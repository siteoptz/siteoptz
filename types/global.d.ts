// Global type declarations

declare global {
  interface Window {
    gtag?: (
      command: string,
      ...args: any[]
    ) => void;
  }
}

// Make it a module
export {};