import React from 'react';
import { motion } from 'framer-motion';

export function ActionCard({ title, icon, children, onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 text-slate-900 dark:text-white shadow-lg rounded-2xl p-6 border border-slate-300 dark:border-slate-700 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:border-emerald-500/30 transition-all duration-200 ease-in-out flex flex-col items-center gap-3 text-center group"
    >
      {icon && <div className="text-emerald-500 bg-emerald-500/10 p-3 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200 ease-in-out">{icon}</div>}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-all duration-200 ease-in-out">{title}</h3>
        {children}
      </div>
    </motion.div>
  );
}
