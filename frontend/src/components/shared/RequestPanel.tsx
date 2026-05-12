import React, { useState } from 'react';

interface RequestPanelProps {
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  onSendToRepeater?: () => void;
  onSendToFuzzer?: () => void;
}

export const RequestPanel: React.FC<RequestPanelProps> = ({
  value,
  onChange,
  readOnly = false,
  onSendToRepeater,
  onSendToFuzzer
}) => {
  const [viewMode, setViewMode] = useState<'Pretty' | 'Raw' | 'Hex'>('Raw');

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] border-none">
      {/* Header Panel */}
      <div className="flex items-center justify-between px-3 h-8 bg-[#252526] border-b border-[#333333] shrink-0">
        <span className="text-[11px] font-semibold text-[#cccccc]">Request</span>
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
      
      {/* Editor Area - Standard IDE Text Color (#d4d4d4), NO GREEN */}
      <textarea
        className="flex-1 p-3 w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[12px] leading-relaxed resize-none focus:outline-none placeholder-[#6b7280]"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        readOnly={readOnly}
        spellCheck={false}
      />
      
      {/* Footer Actions */}
      {(onSendToRepeater || onSendToFuzzer) && (
        <div className="flex gap-2 p-2 bg-[#252526] border-t border-[#333333] shrink-0">
          {onSendToRepeater && (
            <button 
              onClick={onSendToRepeater} 
              className="px-3 py-1 bg-[#333333] hover:bg-[#404040] text-[#cccccc] text-[11px] rounded-[2px] transition-none"
            >
              Send to Repeater
            </button>
          )}
          {onSendToFuzzer && (
            <button 
              onClick={onSendToFuzzer} 
              className="px-3 py-1 bg-[#333333] hover:bg-[#404040] text-[#cccccc] text-[11px] rounded-[2px] transition-none"
            >
              Send to Fuzzer
            </button>
          )}
        </div>
      )}
    </div>
  );
};
