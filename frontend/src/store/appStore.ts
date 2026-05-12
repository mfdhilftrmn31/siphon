import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isSetupComplete: boolean;
  isAuthenticated: boolean;
  hasRegistered: boolean;
  activeTab: string;
  setSetupComplete: (val: boolean) => void;
  setAuthenticated: (val: boolean) => void;
  setRegistered: (val: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isSetupComplete: false,
      isAuthenticated: false, // Selalu false tiap aplikasi di-restart
      hasRegistered: false,   // Default false untuk pengguna baru
      activeTab: 'Proxy',
      setSetupComplete: (val) => set({ isSetupComplete: val }),
      setAuthenticated: (val) => set({ isAuthenticated: val }),
      setRegistered: (val) => set({ hasRegistered: val }),
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'siphon-storage',
      partialize: (state) => ({ 
        isSetupComplete: state.isSetupComplete,
        hasRegistered: state.hasRegistered, // Simpan status registrasi
        activeTab: state.activeTab 
      }),
    }
  )
);
