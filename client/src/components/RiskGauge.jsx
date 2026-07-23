import React from 'react';

export default function RiskGauge({ score, label = 'Risk Score', size = 'md' }) {
  // Determine status color scheme based on score
  const isHigh = score > 60;
  const isMedium = score > 30 && score <= 60;

  const colorClass = isHigh
    ? 'text-rose-500 stroke-rose-500'
    : isMedium
    ? 'text-amber-500 stroke-amber-500'
    : 'text-emerald-500 stroke-emerald-500';

  const bgClass = isHigh
    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    : isMedium
    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';

  const textLabel = isHigh ? 'High Risk' : isMedium ? 'Moderate Risk' : 'Low Risk';

  const radius = size === 'lg' ? 42 : size === 'sm' ? 24 : 32;
  const strokeWidth = size === 'lg' ? 8 : size === 'sm' ? 5 : 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={svgSize} height={svgSize} className="transform -rotate-90">
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-bold ${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-xs' : 'text-base'}`}>
            {score}
          </span>
          {size === 'lg' && <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">/100</span>}
        </div>
      </div>
      {label && (
        <div className="mt-2 flex flex-col items-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
          <span className={`mt-0.5 px-2 py-0.5 text-[11px] font-semibold rounded-full border ${bgClass}`}>
            {textLabel}
          </span>
        </div>
      )}
    </div>
  );
}
