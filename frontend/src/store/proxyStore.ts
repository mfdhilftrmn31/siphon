import { create } from 'zustand';
import { HttpRequest } from '@/types/proxy.types';

interface ProxyState {
  isInterceptOn: boolean;
  setInterceptOn: (status: boolean) => void;
  
  selectedHistoryRequest: HttpRequest | null;
  setSelectedHistoryRequest: (req: HttpRequest | null) => void;
  
  interceptedRequest: HttpRequest | null;
  setInterceptedRequest: (req: HttpRequest | null) => void;
}

export const useProxyStore = create<ProxyState>((set) => ({
  isInterceptOn: false,
  setInterceptOn: (status: boolean) => set({ isInterceptOn: status }),
  
  selectedHistoryRequest: null,
  setSelectedHistoryRequest: (req: HttpRequest | null) => set({ selectedHistoryRequest: req }),
  
  interceptedRequest: null,
  setInterceptedRequest: (req: HttpRequest | null) => set({ interceptedRequest: req }),
}));
