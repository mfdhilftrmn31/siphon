import { FuzzerResult } from '@/types/fuzzer.types';
// import { axiosInstance } from './axiosInstance';

const mockFuzzerResults: FuzzerResult[] = [
  { id: '1', payload: 'admin', status: 200, length: 1240, timeMs: 45, isAnomaly: false },
  { id: '2', payload: 'guest', status: 200, length: 1240, timeMs: 42, isAnomaly: false },
  { id: '3', payload: "' OR 1=1 --", status: 500, length: 4321, timeMs: 210, isAnomaly: true },
  { id: '4', payload: '<script>alert(1)</script>', status: 200, length: 1285, timeMs: 50, isAnomaly: true },
  { id: '5', payload: 'root', status: 403, length: 220, timeMs: 38, isAnomaly: false },
];

export const startFuzzer = async (config: { request_template: string; payloads: string[]; threads: number; delay: number }): Promise<{ status: string }> => {
  // return (await axiosInstance.post('/api/fuzzer/start', config)).data;
  console.log("Starting fuzzer with config:", config);
  return new Promise((resolve) => setTimeout(() => resolve({ status: 'running' }), 500));
};

export const stopFuzzer = async (): Promise<{ status: string }> => {
  // return (await axiosInstance.post('/api/fuzzer/stop')).data;
  return new Promise((resolve) => setTimeout(() => resolve({ status: 'stopped' }), 300));
};

export const getFuzzerResults = async (): Promise<FuzzerResult[]> => {
  // return (await axiosInstance.get('/api/fuzzer/results')).data;
  return new Promise((resolve) => setTimeout(() => resolve(mockFuzzerResults), 400));
};
