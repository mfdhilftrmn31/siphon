import React, { useState } from 'react';
import { HttpResponse } from '@/types/proxy.types';

interface ResponsePanelProps {
  response?: HttpResponse;
}

export const ResponsePanel: React.FC<ResponsePanelProps> = ({ response }) => {
  const [viewMode, setViewMode] = useState<'Pretty' | 'Raw' | 'Hex'>('Raw');

  if (!response) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-[#969696] font-mono text-[11px]">
        No response received.
      </div>
    );
  }

  const rawResponse = `HTTP/1.1 ${response.status}\n${Object.entries(response.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${response.body}`;

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] border-none">
      <div className="flex items-center justify-between px-3 h-8 bg-[#252526] border-b border-[#333333] shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold text-[#cccccc]">Response</span>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className={`px-1.5 py-0.5 rounded-[2px] ${response.status < 400 ? 'bg-[#155e3a] text-white' : 'bg-[#7e2a2a] text-white'}`}>
              {response.status}
            </span>
            <span className="text-[#969696]">{response.length} B</span>
            <span className="text-[#969696]">{response.timeMs} ms</span>
          </div>
        </div>
        <div className="flex bg-[#1e1e1e] border border-[#333333] rounded-[2px] overflow-hidden">
          {['Pretty', 'Raw', 'Hex'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-3 py-0.5 text-[10px] transition-none ${
                viewMode === mode 
                  ? 'bg-[#333333] text-white' 
                  : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      
      <textarea
        className="flex-1 p-3 w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[12px] leading-relaxed resize-none focus:outline-none"
        value={viewMode === 'Raw' ? rawResponse : response.body}
        readOnly
        spellCheck={false}
      />
    </div>
  );
};
