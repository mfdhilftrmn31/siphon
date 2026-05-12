import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnomalies, dismissAnomaly } from '@/api/inspector';
import { AnomalyItem } from '@/types/inspector.types';
import { AlertTriangle, ShieldAlert, Info } from 'lucide-react';

export default function InspectorTab() {
  const queryClient = useQueryClient();
  const { data: anomalies, isLoading } = useQuery({ queryKey: ['anomalies'], queryFn: getAnomalies });
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyItem | null>(null);

  const dismissMutation = useMutation({
    mutationFn: dismissAnomaly,
    onSuccess: (_, id) => {
      // Update cache lokal setelah dismiss berhasil
      queryClient.setQueryData(['anomalies'], (old: AnomalyItem[] | undefined) => old?.filter(a => a.id !== id));
      if (selectedAnomaly?.id === id) setSelectedAnomaly(null);
    }
  });

  const getSeverityStyle = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'HIGH': return 'text-[#f14c4c] bg-[#f14c4c]/10 border-[#f14c4c]/20';
      case 'MEDIUM': return 'text-[#cca700] bg-[#cca700]/10 border-[#cca700]/20';
      case 'LOW': return 'text-[#007acc] bg-[#007acc]/10 border-[#007acc]/20';
      default: return 'text-[#cccccc] bg-[#333333] border-[#333333]';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'HIGH': return <ShieldAlert size={12} className="text-[#f14c4c]" />;
      case 'MEDIUM': return <AlertTriangle size={12} className="text-[#cca700]" />;
      default: return <Info size={12} className="text-[#007acc]" />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e]">
      
      {/* Enterprise Sub-navigation */}
      <div className="flex items-center h-8 bg-[#252526] border-b border-[#333333] px-2 shrink-0 select-none">
        <button className="px-4 h-full text-[12px] transition-none flex items-center bg-[#1e1e1e] text-[#ffffff] border-t border-l border-r border-[#333333] mt-[-1px] font-medium">
          Anomalies Detected
        </button>
      </div>

      {/* TOP PANEL: Anomalies Table */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#1e1e1e]">
        <div className="grid grid-cols-[100px_180px_1fr_120px] text-[11px] font-semibold text-[#cccccc] bg-[#2d2d30] border-b border-[#333333] shrink-0">
          <div className="px-3 py-1 border-r border-[#333333]">Severity</div>
          <div className="px-3 py-1 border-r border-[#333333]">Endpoint</div>
          <div className="px-3 py-1 border-r border-[#333333]">Issue Description</div>
          <div className="px-3 py-1">Time Detected</div>
        </div>

        <div className="flex-1 overflow-y-auto cursor-default font-mono text-[11px]">
          {isLoading ? (
            <div className="p-3 text-[#969696] font-sans text-[12px]">Analyzing traffic patterns...</div>
          ) : (
            <div className="flex flex-col">
              {anomalies?.map((anomaly) => {
                const isSelected = selectedAnomaly?.id === anomaly.id;
                return (
                  <div 
                    key={anomaly.id} 
                    onClick={() => setSelectedAnomaly(anomaly)}
                    className={`grid grid-cols-[100px_180px_1fr_120px] border-b border-[#333333] transition-none items-center ${
                      isSelected ? 'bg-[#04395e] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                    }`}
                  >
                    <div className="px-3 py-1.5 border-r border-[#333333] flex items-center gap-1.5">
                      {getSeverityIcon(anomaly.severity)}
                      <span className={isSelected ? 'text-white font-bold' : getSeverityStyle(anomaly.severity).split(' ')[0]}>
                        {anomaly.severity}
                      </span>
                    </div>
                    <div className={`px-3 py-1.5 border-r border-[#333333] truncate ${isSelected ? 'text-white' : 'text-[#d4d4d4]'}`}>
                      {anomaly.endpoint}
                    </div>
                    <div className="px-3 py-1.5 border-r border-[#333333] truncate">
                      {anomaly.description}
                    </div>
                    <div className={`px-3 py-1.5 truncate ${isSelected ? 'text-white' : 'text-[#969696]'}`}>
                      {new Date(anomaly.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                );
              })}
              {(!anomalies || anomalies.length === 0) && (
                <div className="p-3 text-[#969696] font-sans text-[12px] italic">No anomalies detected in current session.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM PANEL: Anomaly Details Splitter */}
      <div className="h-[45%] flex flex-col border-t border-[#333333] bg-[#1e1e1e]">
        {selectedAnomaly ? (
          <div className="flex flex-col h-full">
            {/* Header Detail */}
            <div className="flex items-center justify-between px-4 h-8 bg-[#252526] border-b border-[#333333] shrink-0">
              <span className="text-[11px] font-semibold text-[#ffffff]">Vulnerability Details</span>
              <button 
                onClick={() => dismissMutation.mutate(selectedAnomaly.id)}
                disabled={dismissMutation.isPending}
                className="text-[11px] text-[#f14c4c] hover:text-[#ff6b6b] hover:underline transition-none"
              >
                {dismissMutation.isPending ? 'Dismissing...' : 'Dismiss Anomaly'}
              </button>
            </div>
            
            {/* Content Detail */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className={`px-3 py-1 rounded-[2px] border flex items-center gap-2 ${getSeverityStyle(selectedAnomaly.severity)}`}>
                  {getSeverityIcon(selectedAnomaly.severity)}
                  <span className="text-[11px] font-bold uppercase">{selectedAnomaly.severity} RISK</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#ffffff] mb-1">{selectedAnomaly.endpoint}</span>
                  <span className="text-[11px] font-mono text-[#969696]">Req ID: {selectedAnomaly.requestId}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 max-w-4xl">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-[#cccccc] uppercase tracking-wider">Description</span>
                  <p className="text-[12px] text-[#d4d4d4] leading-relaxed bg-[#252526] border border-[#333333] p-3 rounded-[2px]">
                    {selectedAnomaly.description}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-[#cca700] uppercase tracking-wider">Suggested Remediation</span>
                  <p className="text-[12px] text-[#d4d4d4] leading-relaxed bg-[#252526] border border-[#333333] border-l-2 border-l-[#cca700] p-3 rounded-[2px]">
                    {selectedAnomaly.suggestion}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#333333] pt-4">
                <button className="h-7 px-4 bg-[#007acc] hover:bg-[#005c99] text-white text-[11px] font-medium rounded-[2px] transition-none">
                  Load Request in Repeater
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[#969696] font-sans text-[12px]">
            Select an anomaly to view detailed analysis and remediation steps.
          </div>
        )}
      </div>

    </div>
  );
}
