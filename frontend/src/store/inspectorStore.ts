import { create } from 'zustand';
import { AnomalyItem } from '@/types/inspector.types';

interface InspectorState {
  selectedAnomaly: AnomalyItem | null;
  setSelectedAnomaly: (anomaly: AnomalyItem | null) => void;
}

export const useInspectorStore = create<InspectorState>((set) => ({
  selectedAnomaly: null,
  setSelectedAnomaly: (anomaly: AnomalyItem | null) => set({ selectedAnomaly: anomaly }),
}));
