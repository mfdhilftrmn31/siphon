export interface Settings {
  proxyPort: number;
  bindAddress: string;
  activeUserAgent: string;
  theme: 'light' | 'dark';
}

export interface CollaboratorInteraction {
  id: string;
  type: 'dns' | 'http' | 'smtp';
  sourceIp: string;
  timestamp: string;
  detail: string;
}
