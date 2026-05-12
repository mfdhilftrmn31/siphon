import { CollaboratorInteraction } from '@/types/common.types';
// import { axiosInstance } from './axiosInstance';

const mockInteractions: CollaboratorInteraction[] = [
  {
    id: 'int-001',
    type: 'dns',
    sourceIp: '8.8.8.8',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    detail: 'DNS Query for xxxxx.collaborator-server.com (Type: A)'
  },
  {
    id: 'int-002',
    type: 'http',
    sourceIp: '1.1.1.1',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    detail: 'HTTP GET request to /log?data=sensitive_info'
  }
];

export const saveCollaboratorConfig = async (serverUrl: string): Promise<boolean> => {
  // await axiosInstance.post('/api/collaborator/config', { serverUrl });
  return new Promise((resolve) => setTimeout(() => resolve(true), 300));
};

export const getCollaboratorStatus = async (): Promise<{ status: 'connected' | 'disconnected' }> => {
  // return (await axiosInstance.get('/api/collaborator/status')).data;
  return new Promise((resolve) => resolve({ status: 'connected' }));
};

export const getCollaboratorInteractions = async (): Promise<CollaboratorInteraction[]> => {
  // return (await axiosInstance.get('/api/collaborator/interactions')).data;
  return new Promise((resolve) => setTimeout(() => resolve(mockInteractions), 400));
};

export const clearCollaboratorInteractions = async (): Promise<void> => {
  // await axiosInstance.delete('/api/collaborator/interactions');
  return new Promise((resolve) => setTimeout(() => resolve(), 300));
};
