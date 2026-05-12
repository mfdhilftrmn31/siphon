import React, { useEffect, useState } from 'react';
import { useProxyStore } from '@/store/proxyStore';
import { getAppStatus } from '@/api/settings';
import { AlertTriangle, Activity, ShieldX, ShieldCheck } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { isInterceptOn, setInterceptOn } = useProxyStore();
  const [status, setStatus] = useState({ proxyActive: false, totalRequests: 0, anomaliesFound: 0 });

  useEffect(() => {
    getAppStatus().then((res) => {
      setStatus({
        proxyActive: res.proxyActive,
        totalRequests: res.totalRequests,
        anomaliesFound: res.anomaliesFound
      });
    });
  }, []);

  return (
    // Menggunakan warna biru standar Enterprise IDE (VS Code Status Bar style)
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-2 text-[11px] font-sans shrink-0 select-none">
      
      <div className="flex items-center h-full gap-1">
        {/* Proxy Status Indicator */}
        <div className="flex items-center gap-1.5 px-2 h-full hover:bg-white/10 cursor-default transition-none">
          <Activity size={12} />
          <span>Proxy: {status.proxyActive ? 'Port 8080' : 'Stopped'}</span>
        </div>
        
        {/* Intercept Toggle */}
        <div 
          className={`flex items-center gap-1.5 px-2 h-full cursor-pointer transition-none ${
            isInterceptOn ? 'bg-white/20 hover:bg-white/30' : 'hover:bg-white/10'
          }`}
          onClick={() => setInterceptOn(!isInterceptOn)}
        >
          {isInterceptOn ? <ShieldCheck size={12} /> : <ShieldX size={12} />}
          <span>Intercept: {isInterceptOn ? 'ON' : 'OFF'}</span>
        </div>
      </div>
      
      <div className="flex items-center h-full gap-1">
        {/* Request Counter */}
        <div className="flex items-center px-2 h-full hover:bg-white/10 cursor-default transition-none">
          <span>Reqs: {status.totalRequests}</span>
        </div>
        
        {/* Anomalies Indicator (Berubah jadi kuning padat jika ada alert, tanpa efek neon) */}
        <div 
          className={`flex items-center gap-1.5 px-2 h-full cursor-pointer transition-none ${
            status.anomaliesFound > 0 
              ? 'bg-[#cca700] text-[#1e1e1e] hover:bg-[#d7b51e]' 
              : 'hover:bg-white/10'
          }`}
        >
          <AlertTriangle size={12} />
          <span>Anomalies: {status.anomaliesFound}</span>
        </div>
      </div>
      
    </div>
  );
};
