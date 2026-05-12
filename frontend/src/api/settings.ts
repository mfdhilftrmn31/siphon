import { Settings } from '@/types/common.types';
// import { axiosInstance } from './axiosInstance';

export const getSettings = async (): Promise<Settings> => {
  // return (await axiosInstance.get('/api/settings')).data;
  return new Promise((resolve) => resolve({
    proxyPort: 8080,
    bindAddress: '127.0.0.1',
    activeUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    theme: 'light'
  }));
};

export const updateSettings = async (settings: Partial<Settings>): Promise<boolean> => {
  // await axiosInstance.post('/api/settings', settings);
  return new Promise((resolve) => setTimeout(() => resolve(true), 300));
};

export const getUserAgents = async (): Promise<string[]> => {
  // return (await axiosInstance.get('/api/settings/user-agents')).data;
  return [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
    'SIPHON/1.0 (Cybersecurity Research Tool)'
  ];
};

export const getAppStatus = async (): Promise<{ proxyActive: boolean; interceptOn: boolean; totalRequests: number; anomaliesFound: number }> => {
  // return (await axiosInstance.get('/api/settings/status')).data;
  return new Promise((resolve) => resolve({
    proxyActive: true,
    interceptOn: false,
    totalRequests: 142,
    anomaliesFound: 5
  }));
};

export const regenerateCA = async (): Promise<boolean> => {
  // await axiosInstance.post('/api/settings/regenerate-ca');
  return new Promise((resolve) => setTimeout(() => resolve(true), 2000));
};
