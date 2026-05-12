import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getScopeRules } from '@/api/proxy';
import { ScopeRule } from '@/types/proxy.types';

export default function Scope() {
  const { data: initialRules, isLoading } = useQuery({ queryKey: ['scopeRules'], queryFn: getScopeRules });
  const [rules, setRules] = useState<ScopeRule[]>([]);
  const [newPattern, setNewPattern] = useState('');
  const [newType, setNewType] = useState<'include' | 'exclude'>('include');

  // Sinkronisasi data saat query selesai
  useEffect(() => {
    if (initialRules) setRules(initialRules);
  }, [initialRules]);

  const handleAddRule = () => {
    if (!newPattern.trim()) return;
    const newRule: ScopeRule = {
      id: `scp-${Date.now()}`,
      type: newType,
      pattern: newPattern.trim()
    };
    setRules([...rules, newRule]);
    setNewPattern('');
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] text-[#cccccc] p-6">
      <div className="mb-6 max-w-4xl">
        <h2 className="text-[14px] font-semibold text-[#ffffff] mb-1">Target Scope Configuration</h2>
        <p className="text-[12px] text-[#969696]">
          Define which URLs and domains should be processed by SIPHON. Traffic matching "Exclude" rules will be completely ignored and will not appear in the history.
        </p>
      </div>

      {/* Add Rule Form - Enterprise Input Fields */}
      <div className="flex items-center gap-2 mb-8 max-w-4xl">
        {/* Fix: Tambahan colorScheme dark dan style eksplisit untuk option */}
        <select 
          value={newType} 
          onChange={(e) => setNewType(e.target.value as 'include' | 'exclude')}
          className="h-7 px-2 bg-[#252526] border border-[#333333] text-[12px] text-[#cccccc] focus:outline-none focus:border-[#007acc] rounded-[2px] cursor-pointer"
          style={{ colorScheme: 'dark' }}
        >
          <option value="include" className="bg-[#252526] text-[#cccccc]">Include</option>
          <option value="exclude" className="bg-[#252526] text-[#cccccc]">Exclude</option>
        </select>
        
        <input 
          type="text" 
          value={newPattern}
          onChange={(e) => setNewPattern(e.target.value)}
          placeholder="Regex pattern (e.g., ^https://api\.target\.local/.*)"
          className="flex-1 h-7 px-3 bg-[#252526] border border-[#333333] text-[12px] text-[#d4d4d4] font-mono focus:outline-none focus:border-[#007acc] rounded-[2px] placeholder-[#666666]"
          onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
        />
        
        <button 
          onClick={handleAddRule}
          className="h-7 px-4 bg-[#007acc] hover:bg-[#005c99] text-white text-[12px] font-medium rounded-[2px] transition-none"
        >
          Add Rule
        </button>
      </div>

      {/* Rules Table - Strict Grid */}
      <div className="flex flex-col border border-[#333333] flex-1 max-w-4xl overflow-hidden bg-[#1e1e1e]">
        <div className="grid grid-cols-[100px_1fr_80px] bg-[#2d2d30] border-b border-[#333333] text-[11px] font-semibold shrink-0">
          <div className="px-3 py-1.5 border-r border-[#333333]">Type</div>
          <div className="px-3 py-1.5 border-r border-[#333333]">Regex Pattern</div>
          <div className="px-3 py-1.5 text-center">Actions</div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-[12px] text-[#969696]">Loading rules...</div>
          ) : (
            rules.map((rule) => (
              <div key={rule.id} className="grid grid-cols-[100px_1fr_80px] border-b border-[#333333] text-[12px] hover:bg-[#2a2d2e] items-center">
                <div className="px-3 py-1.5 border-r border-[#333333]">
                  <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded-[2px] ${rule.type === 'include' ? 'text-[#b5cea8] bg-[#b5cea8]/10' : 'text-[#ce9178] bg-[#ce9178]/10'}`}>
                    {rule.type}
                  </span>
                </div>
                <div className="px-3 py-1.5 border-r border-[#333333] font-mono text-[#d4d4d4] truncate">
                  {rule.pattern}
                </div>
                <div className="px-3 py-1.5 flex justify-center">
                  <button 
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-[#f14c4c] hover:text-[#ff6b6b] text-[11px] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
          {rules.length === 0 && !isLoading && (
            <div className="p-3 text-[12px] text-[#969696] font-mono italic">No scope rules defined. Traffic from all targets will be logged.</div>
          )}
        </div>
      </div>
    </div>
  );
}
