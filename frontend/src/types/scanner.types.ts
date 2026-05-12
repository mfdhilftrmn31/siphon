export interface ScanResult {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  type: string;
  endpoint: string;
  description: string;
  confidence: 'Certain' | 'Firm' | 'Tentative';
  requestId: string;
}
