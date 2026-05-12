export interface HttpResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
  length: number;
  timeMs: number;
}

export interface HttpRequest {
  id: string;
  method: string;
  host: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  timestamp: string;
  hasAnomaly: boolean;
  anomalyId?: string;
  response?: HttpResponse; // Digabung agar request history juga punya data response-nya
}

export interface ScopeRule {
  id: string;
  type: 'include' | 'exclude';
  pattern: string;
}

export interface Target {
  id: string;
  domain: string;
  addedAt: string;
}
