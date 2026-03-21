import React from 'react';
import { motion } from 'framer-motion';

export function ActionCard({ title, icon, onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card text-card-foreground shadow-sm rounded-2xl p-6 border border-border cursor-pointer hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all flex flex-col items-center gap-4 text-center group"
    >
      <div className="text-primary bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </motion.div>
  );
}
