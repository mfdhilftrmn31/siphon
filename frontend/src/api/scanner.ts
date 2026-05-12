import { ScanResult } from '@/types/scanner.types';

const mockScanResults: ScanResult[] = [
  {
    id: 'scan-001',
    severity: 'HIGH',
    type: 'Cross-Site Scripting (Reflected)',
    endpoint: '/search',
    description: 'User input from the "q" parameter is reflected directly into the HTML response without adequate sanitization or escaping.',
    confidence: 'Certain',
    requestId: 'req-004'
  },
  {
    id: 'scan-002',
    severity: 'LOW',
    type: 'Missing Anti-Clickjacking Header',
    endpoint: '/*',
    description: 'The application does not return an X-Frame-Options or Content-Security-Policy (frame-ancestors) header, leaving it vulnerable to Clickjacking attacks.',
    confidence: 'Firm',
    requestId: 'req-001'
  }
];

export const runPassiveScan = async (): Promise<{ status: string }> => {
  return new Promise((resolve) => setTimeout(() => resolve({ status: 'running' }), 500));
};

export const stopPassiveScan = async (): Promise<{ status: string }> => {
  return new Promise((resolve) => setTimeout(() => resolve({ status: 'stopped' }), 300));
};

export const getScanResults = async (): Promise<ScanResult[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockScanResults), 400));
};
