import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SeverityBadgeProps {
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE' | string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const getSeverityClasses = (sev: string) => {
    switch (sev.toUpperCase()) {
      case 'HIGH':
        return 'bg-status-high text-white hover:bg-status-high/80';
      case 'MEDIUM':
        return 'bg-status-medium text-white hover:bg-status-medium/80';
      case 'LOW':
        return 'bg-status-low text-white hover:bg-status-low/80';
      case 'SAFE':
      case 'ACTIVE':
        return 'bg-status-safe text-white hover:bg-status-safe/80';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-500/80';
    }
  };

  return (
    <Badge className={`${getSeverityClasses(severity)} border-none font-bold text-[10px] px-2 py-0.5 tracking-wider`}>
      {severity.toUpperCase()}
    </Badge>
  );
};
