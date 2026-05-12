import React, { useState, useEffect } from 'react';
import { useProxyStore } from '@/store/proxyStore';
import { RequestPanel } from '@/components/shared/RequestPanel';

export default function Intercept() {
  const { isInterceptOn, setInterceptOn, interceptedRequest, setInterceptedRequest } = useProxyStore();
  const [editedRequest, setEditedRequest] = useState<string>('');

  useEffect(() => {
    if (interceptedRequest) {
      const rawReq = `${interceptedRequest.method} ${new URL(interceptedRequest.url).pathname} HTTP/1.1\n${Object.entries(interceptedRequest.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${interceptedRequest.body}`;
      setEditedRequest(rawReq);
    } else {
      setEditedRequest('');
    }
  }, [interceptedRequest]);

  const handleForward = () => {
    setInterceptedRequest(null);
  };

  const handleDrop = () => {
    setInterceptedRequest(null);
  };

  const simulateIncomingTraffic = () => {
    setInterceptedRequest({
      id: `req-intercept-${Date.now()}`,
      method: 'POST',
      host: 'api.target.local',
      url: 'https://api.target.local/v1/admin/delete',
      headers: { 'Host': 'api.target.local', 'Content-Type': 'application/json', 'Authorization': 'Bearer test_token_xyz' },
      body: '{"userId": 42, "force": true}',
      timestamp: new Date().toISOString(),
      hasAnomaly: false
    });
  };

  if (!isInterceptOn) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-[#1e1e1e] text-[#969696] gap-4">
        <span className="text-[14px] font-semibold text-[#cccccc]">Intercept is Disabled</span>
        <span className="text-[12px] max-w-md text-center">Traffic is passing through freely. Enable intercept to modify requests on the fly.</span>
        <button 
          onClick={() => setInterceptOn(true)} 
          className="mt-2 px-4 py-1.5 bg-[#007acc] hover:bg-[#005c99] text-white text-[12px] font-medium rounded-[2px] transition-none"
        >
          Enable Intercept
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e]">
      {/* Enterprise Action Bar - Flat, Strict Borders */}
      <div className="flex items-center justify-between px-3 h-10 bg-[#252526] border-b border-[#333333] shrink-0">
        <div className="flex items-center gap-2">
          {/* VS Code Standard Blue for Primary Action */}
          <button 
            onClick={handleForward} 
            disabled={!interceptedRequest} 
            className="px-4 py-1 bg-[#007acc] hover:bg-[#005c99] disabled:bg-[#333333] disabled:text-[#666666] text-white text-[12px] font-medium rounded-[2px] transition-none flex items-center gap-2"
          >
            Forward
          </button>
          {/* Muted Red for Destructive Action */}
          <button 
            onClick={handleDrop} 
            disabled={!interceptedRequest} 
            className="px-4 py-1 bg-[#c53b3b] hover:bg-[#a02c2c] disabled:bg-[#333333] disabled:text-[#666666] text-white text-[12px] font-medium rounded-[2px] transition-none flex items-center gap-2"
          >
            Drop
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          {!interceptedRequest && (
            <button 
              onClick={simulateIncomingTraffic} 
              className="px-3 py-1 bg-transparent border border-[#333333] hover:bg-[#2a2d2e] text-[#cccccc] text-[11px] rounded-[2px] transition-none"
            >
              [DEV] Simulate Request
            </button>
          )}
          
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] border border-[#333333] rounded-[2px]">
            <div className={`w-2 h-2 rounded-full ${interceptedRequest ? 'bg-[#d7ba7d]' : 'bg-[#007acc]'}`}></div>
            <span className={`text-[11px] font-semibold uppercase ${interceptedRequest ? 'text-[#d7ba7d]' : 'text-[#007acc]'}`}>
              {interceptedRequest ? 'Request Caught' : 'Listening'}
            </span>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden">
        {interceptedRequest ? (
          <RequestPanel 
            value={editedRequest} 
            onChange={setEditedRequest} 
            readOnly={false} 
            onSendToRepeater={() => console.log('Sent to Repeater')}
            onSendToFuzzer={() => console.log('Sent to Fuzzer')}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[#969696] text-[12px]">
             Waiting for traffic...
          </div>
        )}
      </div>
    </div>
  );
}
