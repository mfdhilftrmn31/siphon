import { HttpResponse } from '@/types/proxy.types';
// import { axiosInstance } from './axiosInstance';

export interface RepeaterTab {
  id: string;
  name: string;
  request: string;
  response?: HttpResponse;
}

const mockTabs: RepeaterTab[] = [
  {
    id: 'tab-1',
    name: 'Login Attempt',
    request: 'POST /v1/auth/login HTTP/1.1\nHost: api.target.local\nContent-Type: application/json\nUser-Agent: SIPHON/1.0\n\n{"username": "admin", "password": "password123"}'
  }
];

export const getRepeaterTabs = async (): Promise<RepeaterTab[]> => {
  // return (await axiosInstance.get('/api/repeater/tabs')).data;
  return new Promise((resolve) => setTimeout(() => resolve(mockTabs), 200));
};

export const sendRepeaterRequest = async (requestText: string): Promise<HttpResponse> => {
  // return (await axiosInstance.post('/api/repeater/send', { request: requestText })).data;
  return new Promise((resolve) => setTimeout(() => {
    resolve({
      status: 401,
      headers: { 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '99' },
      body: '{"error": "Unauthorized", "message": "Invalid credentials"}',
      length: 61,
      timeMs: 145
    });
  }, 800)); // Simulasi latency network
};

export const loadRequestToRepeater = async (requestId: string): Promise<RepeaterTab> => {
  // return (await axiosInstance.post('/api/repeater/load', { request_id: requestId })).data;
  return new Promise((resolve) => setTimeout(() => resolve({
    id: `tab-${Date.now()}`,
    name: `Req: ${requestId}`,
    request: `GET /loaded/from/${requestId} HTTP/1.1\nHost: api.target.local\n\n`
  }), 300));
};
