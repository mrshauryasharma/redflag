import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface RiskBadgeProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '', size = 'md' }) => {
  const norm = level.toUpperCase();

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3.5 py-1.5 text-sm font-semibold',
  };

  if (norm === 'HIGH') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-md border border-[#F4C4C4] bg-[#FDF1F1] text-[#C24141] font-medium ${sizeClasses[size]} ${className}`}>
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-[#C24141]" />
        <span>HIGH RISK</span>
      </span>
    );
  }

  if (norm === 'MEDIUM') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-md border border-[#F3DCB5] bg-[#FDF6EC] text-[#B7791F] font-medium ${sizeClasses[size]} ${className}`}>
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#B7791F]" />
        <span>MEDIUM RISK</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border border-[#B7DFCD] bg-[#EAF5F0] text-[#26845B] font-medium ${sizeClasses[size]} ${className}`}>
      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#26845B]" />
      <span>LOW RISK</span>
    </span>
  );
};
