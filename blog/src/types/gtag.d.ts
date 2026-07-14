/* eslint-disable @typescript-eslint/no-explicit-any */

// Declaração global do gtag para TypeScript
interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}
