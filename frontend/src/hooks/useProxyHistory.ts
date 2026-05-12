import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProxyHistory } from '@/api/proxy';
import { HttpRequest } from '@/types/proxy.types';
import { useWebSocket } from './useWebSocket';
import { useEffect } from 'react';

interface UseProxyHistoryParams {
  method?: string;
  status?: string;
  search?: string;
  domain?: string;
}

export const useProxyHistory = (params?: UseProxyHistoryParams) => {
  const queryClient = useQueryClient();
  
  // Ambil data via REST API + set fallback auto refetch setiap 5 detik
  const query = useQuery({
    queryKey: ['proxyHistory', params],
    queryFn: () => getProxyHistory(params),
    refetchInterval: 5000, 
  });

  // Integrasi WebSocket untuk update data instan
  const { data: wsData } = useWebSocket<HttpRequest>('ws://localhost:9999/ws/traffic');

  useEffect(() => {
    if (wsData) {
      // Jika ada request baru dari WS, langsung masukkan ke cache (di paling atas)
      queryClient.setQueryData(['proxyHistory', params], (oldData: HttpRequest[] | undefined) => {
        if (!oldData) return [wsData];
        // Pastikan tidak ada duplikasi ID
        if (oldData.some(req => req.id === wsData.id)) return oldData;
        return [wsData, ...oldData]; 
      });
    }
  }, [wsData, queryClient, params]);

  return query;
};
