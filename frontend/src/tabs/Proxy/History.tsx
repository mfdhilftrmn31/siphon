import React, { useState } from 'react';
import { useProxyHistory } from '@/hooks/useProxyHistory';
import { useProxyStore } from '@/store/proxyStore';
import { RequestPanel } from '@/components/shared/RequestPanel';
import { ResponsePanel } from '@/components/shared/ResponsePanel';

export default function History() {
  const { data: history, isLoading } = useProxyHistory();
  const { selectedHistoryRequest, setSelectedHistoryRequest } = useProxyStore();
  const [activeDetailTab, setActiveDetailTab] = useState<'Request' | 'Response'>('Request');

  const getStatusColor = (status?: number) => {
    if (!status) return 'text-[#969696]';
    if (status >= 400) return 'text-[#f14c4c]';
    return 'text-[#cccccc]';
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e]">
      {/* TOP PANEL: Dense Data Table */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#1e1e1e]">
        <div className="grid grid-cols-[50px_60px_160px_1fr_60px_80px_80px] text-[11px] font-semibold text-[#cccccc] bg-[#2d2d30] border-b border-[#333333] shrink-0">
          <div className="px-2 py-1 border-r border-[#333333]">#</div>
          <div className="px-2 py-1 border-r border-[#333333]">Method</div>
          <div className="px-2 py-1 border-r border-[#333333]">Host</div>
          <div className="px-2 py-1 border-r border-[#333333]">Path</div>
          <div className="px-2 py-1 border-r border-[#333333]">Status</div>
          <div className="px-2 py-1 border-r border-[#333333]">Length</div>
          <div className="px-2 py-1">Time</div>
        </div>

        <div className="flex-1 overflow-y-auto cursor-default font-mono text-[11px]">
          {isLoading ? (
            <div className="p-2 text-[#969696]">Loading data...</div>
          ) : (
            <div className="flex flex-col">
              {history?.map((req, index) => {
                const isSelected = selectedHistoryRequest?.id === req.id;
                return (
                  <div 
                    key={req.id} 
                    onClick={() => setSelectedHistoryRequest(req)}
                    className={`grid grid-cols-[50px_60px_160px_1fr_60px_80px_80px] border-b border-[#333333] transition-none ${
                      isSelected ? 'bg-[#04395e] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                    }`}
                  >
                    <div className="px-2 py-0.5 border-r border-[#333333] truncate">{index + 1}</div>
                    <div className={`px-2 py-0.5 border-r border-[#333333] ${isSelected ? 'text-white' : ''}`}>{req.method}</div>
                    <div className="px-2 py-0.5 border-r border-[#333333] truncate">{req.host}</div>
                    <div className="px-2 py-0.5 border-r border-[#333333] truncate">{new URL(req.url).pathname}</div>
                    <div className={`px-2 py-0.5 border-r border-[#333333] ${isSelected ? 'text-white' : getStatusColor(req.response?.status)}`}>{req.response?.status || '-'}</div>
                    <div className="px-2 py-0.5 border-r border-[#333333]">{req.response?.length || '-'}</div>
                    <div className="px-2 py-0.5">{req.response?.timeMs || '-'}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM PANEL: Inspector Splitter */}
      <div className="h-[45%] flex flex-col border-t border-[#333333] bg-[#1e1e1e]">
        {selectedHistoryRequest ? (
          <>
            <div className="flex items-center h-7 bg-[#252526] border-b border-[#333333] shrink-0 px-1">
              <button 
                onClick={() => setActiveDetailTab('Request')}
                className={`px-3 py-1 text-[11px] transition-none ${activeDetailTab === 'Request' ? 'bg-[#1e1e1e] text-[#cccccc] border border-b-0 border-[#333333] mt-[1px]' : 'text-[#969696]'}`}
              >
                Request
              </button>
              <button 
                onClick={() => setActiveDetailTab('Response')}
                className={`px-3 py-1 text-[11px] transition-none ${activeDetailTab === 'Response' ? 'bg-[#1e1e1e] text-[#cccccc] border border-b-0 border-[#333333] mt-[1px]' : 'text-[#969696]'}`}
              >
                Response
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              {activeDetailTab === 'Request' ? (
                <RequestPanel 
                  value={`${selectedHistoryRequest.method} ${new URL(selectedHistoryRequest.url).pathname} HTTP/1.1\n${Object.entries(selectedHistoryRequest.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${selectedHistoryRequest.body}`} 
                  readOnly 
                />
              ) : (
                <ResponsePanel response={selectedHistoryRequest.response} />
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-[#969696] font-sans text-[12px]">
            No request selected
          </div>
        )}
      </div>
    </div>
  );
}
