import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function InsightCard({ title, children, variant = 'default' }) {
  const variants = {
    default: 'border-slate-700',
    emerald: 'border-emerald-500/30',
    red: 'border-red-500/30',
  };

  const titleColors = {
    default: 'text-slate-500 dark:text-gray-400',
    emerald: 'text-emerald-400',
    red: 'text-red-400',
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        'rounded-2xl border p-4 shadow-lg bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 hover:scale-[1.02] hover:shadow-xl hover:border-emerald-500/30 transition-all duration-200 ease-in-out',
        variants[variant]
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <h4 className={cn('text-xs font-semibold uppercase tracking-wide', titleColors[variant])}>{title}</h4>
      </div>
      <div className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
