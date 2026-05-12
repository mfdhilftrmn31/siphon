import { AnomalyItem } from '@/types/inspector.types';
// import { axiosInstance } from './axiosInstance';

const mockAnomalies: AnomalyItem[] = [
  {
    id: 'anom-001',
    severity: 'HIGH',
    endpoint: '/v1/auth/login',
    description: 'SQL Injection payload detected in the request body (username parameter). Backend returned a stack trace indicating a syntax error.',
    timestamp: new Date(Date.now() - 30000).toISOString(),
    requestId: 'req-002',
    suggestion: 'Investigate request req-002 in Repeater. Review backend input validation and implement parameterized queries.'
  },
  {
    id: 'anom-002',
    severity: 'MEDIUM',
    endpoint: '/assets/app.js',
    description: 'Potential sensitive token exposure. Found a string matching API key entropy patterns (sk_test_...).',
    timestamp: new Date(Date.now() - 15000).toISOString(),
    requestId: 'req-003',
    suggestion: 'Verify if the exposed token is valid. Remove hardcoded secrets from client-side JS and move them to environment variables.'
  }
];

export const getAnomalies = async (): Promise<AnomalyItem[]> => {
  // return (await axiosInstance.get('/api/inspector/anomalies')).data;
  return new Promise((resolve) => setTimeout(() => resolve(mockAnomalies), 300));
};

export const getInspectorSummary = async (): Promise<{ HIGH: number; MEDIUM: number; LOW: number }> => {
  // return (await axiosInstance.get('/api/inspector/summary')).data;
  return new Promise((resolve) => setTimeout(() => resolve({ HIGH: 1, MEDIUM: 1, LOW: 0 }), 300));
};

export const dismissAnomaly = async (id: string): Promise<boolean> => {
  // await axiosInstance.post(`/api/inspector/anomalies/${id}/dismiss`);
  return new Promise((resolve) => setTimeout(() => resolve(true), 200));
};

export const analyzeSequencer = async (tokens: string[]): Promise<{ entropy: number; verdict: 'WEAK' | 'MEDIUM' | 'STRONG'; explanation: string }> => {
  // return (await axiosInstance.post('/api/inspector/sequencer/analyze', { tokens })).data;
  return new Promise((resolve) => setTimeout(() => {
    resolve({
      entropy: 3.42,
      verdict: 'WEAK',
      explanation: 'Analysis indicates low entropy (3.42 bits). The tokens appear to use a predictable Pseudo-Random Number Generator (PRNG) pattern with poor character distribution.'
    });
  }, 2000)); // Simulating network/computation delay
};
