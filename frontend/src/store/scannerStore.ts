import { create } from 'zustand';
import { ScanResult } from '@/types/scanner.types';

interface ScannerState {
  isScanning: boolean;
  setIsScanning: (status: boolean) => void;
  
  scanProgress: number;
  setScanProgress: (progress: number) => void;
  
  selectedResult: ScanResult | null;
  setSelectedResult: (result: ScanResult | null) => void;
}

export const useScannerStore = create<ScannerState>((set) => ({
  isScanning: false,
  setIsScanning: (status: boolean) => set({ isScanning: status }),
  
  scanProgress: 0,
  setScanProgress: (progress: number) => set({ scanProgress: progress }),
  
  selectedResult: null,
  setSelectedResult: (result: ScanResult | null) => set({ selectedResult: result }),
}));
