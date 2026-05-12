export interface AnomalyItem {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  endpoint: string;
  description: string;
  timestamp: string;
  requestId: string;
  suggestion: string;
}
