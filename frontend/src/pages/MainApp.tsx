import React, { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBar } from '@/components/layout/StatusBar';
import { useAppStore } from '@/store/appStore';

import ProxyTab from '@/tabs/Proxy';
import InspectorTab from '@/tabs/Inspector';
import ScannerTab from '@/tabs/Scanner';
import RepeaterTab from '@/tabs/Repeater';
import FuzzerTab from '@/tabs/Fuzzer';
import DecoderTab from '@/tabs/Decoder';
import CollaboratorTab from '@/tabs/Collaborator';
import SettingsTab from '@/tabs/Settings';

export const MainApp: React.FC = () => {
  const { activeTab } = useAppStore();

  const renderTab = () => {
    switch (activeTab) {
      case 'Proxy': return <ProxyTab />;
      case 'Inspector': return <InspectorTab />;
      case 'Scanner': return <ScannerTab />;
      case 'Repeater': return <RepeaterTab />;
      case 'Fuzzer': return <FuzzerTab />;
      case 'Decoder': return <DecoderTab />;
      case 'Collaborator': return <CollaboratorTab />;
      case 'Settings': return <SettingsTab />;
      default: return <ProxyTab />;
    }
  };

  return (
    // Mengubah background utama menjadi gelap ekstrim (Zinc-950)
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#09090B] text-zinc-100 font-sans selection:bg-primary/30">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex overflow-hidden relative bg-[#09090B]">
          <Suspense fallback={<div className="flex-1 flex items-center justify-center font-mono text-zinc-500 text-sm">Loading module...</div>}>
            {renderTab()}
          </Suspense>
        </main>
      </div>
      <StatusBar />
    </div>
  );
};
