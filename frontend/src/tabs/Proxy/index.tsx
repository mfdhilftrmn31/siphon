import React, { useState } from 'react';
import History from './History';
import Intercept from './Intercept';
import Scope from './Scope'; // Kita akan buat file ini di bawah

const SUB_TABS = ['History', 'Intercept', 'Scope'];

export default function ProxyTab() {
  const [activeSubTab, setActiveSubTab] = useState('History');

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e]">
      
      {/* Enterprise / IDE Style Sub-navigation */}
      <div className="flex items-center h-8 bg-[#252526] border-b border-[#333333] px-2 shrink-0 select-none">
        {SUB_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 h-full text-[12px] transition-none flex items-center ${
              activeSubTab === tab 
                ? 'bg-[#1e1e1e] text-[#ffffff] border-t border-l border-r border-[#333333] mt-[-1px] font-medium' 
                : 'text-[#969696] hover:text-[#cccccc] hover:bg-[#2d2d30] border-t border-l border-r border-transparent mt-[-1px]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeSubTab === 'History' && <History />}
        {activeSubTab === 'Intercept' && <Intercept />}
        {activeSubTab === 'Scope' && <Scope />}
      </div>
    </div>
  );
}
