import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTargets } from '@/api/proxy';
import { useProxyHistory } from '@/hooks/useProxyHistory';

export const Sidebar: React.FC = () => {
  const { data: targets } = useQuery({ queryKey: ['targets'], queryFn: getTargets });
  const { data: history } = useProxyHistory();

  const quickHistory = history?.slice(0, 15) || [];

  return (
    <div className="w-[220px] bg-[#252526] flex flex-col h-full border-r border-[#333333] shrink-0 select-none overflow-hidden">
      
      {/* Target Scope Tree */}
      <div className="flex flex-col border-b border-[#333333] pb-2">
        <div className="px-3 py-1.5 flex items-center justify-between bg-[#2d2d30] border-y border-[#333333] mt-[-1px]">
          <span className="text-[11px] font-semibold text-[#cccccc]">Target Scope</span>
          <button className="text-[14px] text-[#cccccc] hover:text-white leading-none">+</button>
        </div>
        <div className="flex flex-col pt-1">
          {targets?.map(t => (
            <div key={t.id} className="flex items-center gap-2 text-[12px] text-[#cccccc] py-0.5 px-3 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="text-[#969696] text-[10px]">▼</span>
              <span className="truncate">{t.domain}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Traffic Log */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="px-3 py-1.5 bg-[#2d2d30] border-b border-[#333333]">
          <span className="text-[11px] font-semibold text-[#cccccc]">Recent Traffic</span>
        </div>
        <div className="flex flex-col overflow-y-auto py-1">
          {quickHistory.map(req => (
            <div key={req.id} className="flex items-center gap-2 text-[11px] py-0.5 px-3 hover:bg-[#2a2d2e] cursor-pointer">
              <span className={`font-mono w-8 shrink-0 ${req.method === 'GET' ? 'text-[#4fc1ff]' : req.method === 'POST' ? 'text-[#b5cea8]' : 'text-[#ce9178]'}`}>
                {req.method}
              </span>
              <span className="truncate flex-1 font-mono text-[#cccccc]">
                {new URL(req.url).pathname}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
