import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnomalies } from '@/api/inspector';
import { AnomalyItem } from '@/types/inspector.types';
import { useWebSocket } from './useWebSocket';
import { useEffect } from 'react';

export const useAnomalies = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['anomalies'],
    queryFn: getAnomalies,
  });

  // Integrasi WebSocket untuk deteksi anomali real-time
  const { data: wsAnomaly } = useWebSocket<AnomalyItem>('ws://localhost:9999/ws/anomalies');

  useEffect(() => {
    if (wsAnomaly) {
      queryClient.setQueryData(['anomalies'], (oldData: AnomalyItem[] | undefined) => {
        if (!oldData) return [wsAnomaly];
        // Cegah duplikasi data anomali
        if (oldData.some(a => a.id === wsAnomaly.id)) return oldData;
        return [wsAnomaly, ...oldData];
      });
    }
  }, [wsAnomaly, queryClient]);

  return query;
};
