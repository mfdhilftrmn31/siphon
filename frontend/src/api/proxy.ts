import { HttpRequest, ScopeRule, Target } from '@/types/proxy.types';
// import { axiosInstance } from './axiosInstance';

// --- MOCK DATA ---
const mockHistory: HttpRequest[] = [
  {
    id: "req-001",
    method: "GET",
    host: "api.target.local",
    url: "https://api.target.local/v1/users",
    headers: { "Host": "api.target.local", "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
    body: "",
    timestamp: new Date(Date.now() - 50000).toISOString(),
    hasAnomaly: false,
    response: {
      status: 200,
      headers: { "Content-Type": "application/json", "Server": "nginx/1.24.0" },
      body: '{"status":"success", "data": [{"id":1, "name":"Admin"}]}',
      length: 56,
      timeMs: 120
    }
  },
  {
    id: "req-002",
    method: "POST",
    host: "api.target.local",
    url: "https://api.target.local/v1/auth/login",
    headers: { "Host": "api.target.local", "Content-Type": "application/json" },
    body: '{"username": "admin\' OR 1=1--", "password": "password"}',
    timestamp: new Date(Date.now() - 30000).toISOString(),
    hasAnomaly: true,
    anomalyId: "anom-001",
    response: {
      status: 500,
      headers: { "Content-Type": "application/json", "X-Powered-By": "Express" },
      body: '{"error": "SQL syntax error near \'OR 1=1--\'"}',
      length: 45,
      timeMs: 350
    }
  },
  {
    id: "req-003",
    method: "GET",
    host: "cdn.target.local",
    url: "https://cdn.target.local/assets/app.js",
    headers: { "Host": "cdn.target.local", "Accept": "*/*" },
    body: "",
    timestamp: new Date(Date.now() - 15000).toISOString(),
    hasAnomaly: false,
    response: {
      status: 200,
      headers: { "Content-Type": "application/javascript", "Cache-Control": "max-age=3600" },
      body: 'console.log("App loaded"); // sensitive_token: "sk_test_12345"',
      length: 62,
      timeMs: 45
    }
  }
];

const mockTargets: Target[] = [
  { id: "tgt-1", domain: "api.target.local", addedAt: new Date().toISOString() },
  { id: "tgt-2", domain: "cdn.target.local", addedAt: new Date().toISOString() }
];

const mockScope: ScopeRule[] = [
  { id: "scp-1", type: "include", pattern: ".*\\.target\\.local/.*" },
  { id: "scp-2", type: "exclude", pattern: ".*\\.target\\.local/logout" }
];

// --- API FUNCTIONS ---

export const getProxyHistory = async (params?: { method?: string; status?: string; search?: string; domain?: string }): Promise<HttpRequest[]> => {
  // return (await axiosInstance.get('/api/proxy/history', { params })).data;
  return new Promise(resolve => setTimeout(() => resolve(mockHistory), 300));
};

export const toggleIntercept = async (isEnabled: boolean): Promise<boolean> => {
  // return (await axiosInstance.post('/api/proxy/intercept/toggle', { isEnabled })).data;
  return new Promise(resolve => setTimeout(() => resolve(isEnabled), 200));
};

export const getTargets = async (): Promise<Target[]> => {
  // return (await axiosInstance.get('/api/proxy/targets')).data;
  return new Promise(resolve => setTimeout(() => resolve(mockTargets), 300));
};

export const getScopeRules = async (): Promise<ScopeRule[]> => {
  // return (await axiosInstance.get('/api/proxy/scope')).data;
  return new Promise(resolve => setTimeout(() => resolve(mockScope), 300));
};
