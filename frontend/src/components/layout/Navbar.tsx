import React from 'react';
import { useAppStore } from '@/store/appStore';

const TABS = ['Proxy', 'Inspector', 'Scanner', 'Repeater', 'Fuzzer', 'Decoder', 'Collaborator', 'Settings'];

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <div className="flex items-center h-8 bg-[#1e1e1e] border-b border-[#333333] px-2 shrink-0 select-none">
      {/* Tiny Logo / Brand */}
      <div className="flex items-center gap-2 mr-6 px-2">
        <img 
          src="/src/assets/siphonlogo.png" 
          alt="SIPHON" 
          className="w-4 h-4 object-contain"
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
        <span className="font-sans font-semibold text-[12px] text-[#cccccc]">SIPHON</span>
      </div>

      {/* Dense, Flat Tabs */}
      <div className="flex items-center h-full">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-full px-3 text-[12px] flex items-center border-t-2 transition-none ${
              activeTab === tab 
                ? 'bg-[#252526] text-[#ffffff] border-[#6366f1]' // Flat Indigo accent for active
                : 'bg-transparent text-[#969696] border-transparent hover:bg-[#2d2d30] hover:text-[#cccccc]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
